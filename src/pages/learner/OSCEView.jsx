import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useAuth } from '@/context/AuthContext'

export default function OSCEView() {
  const { user } = useAuth()
  const [selectedEvalIndex, setSelectedEvalIndex] = useState(0)

  const { data = [], isLoading, error } = useQuery({
    queryKey: ['osce-results', user?.id],
    queryFn: () => api.get(`/learner/osce/${user?.id}`).then(r => r.data),
    enabled: !!user?.id,
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
  
  if (error || !Array.isArray(data) || data.length === 0) return (
    <div className="text-center py-16">
      <div className="text-4xl mb-3">📋</div>
      <p className="text-slate-500">OSCE results not available yet.</p>
      <Link to="/learner" className="mt-4 inline-block text-blue-600 text-sm hover:underline">← Back to Dashboard</Link>
    </div>
  )

  const activeReport = data[selectedEvalIndex] || data[0]
  const passCount = (activeReport.steps || []).filter(s => s.result === 'pass').length

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/learner" className="text-slate-400 hover:text-slate-600 text-sm">← Dashboard</Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-700 font-medium">OSCE Results</span>
      </div>

      {/* Selector for multiple evaluations */}
      {data.length > 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Evaluation:</span>
            <select
              value={selectedEvalIndex}
              onChange={(e) => setSelectedEvalIndex(Number(e.target.value))}
              className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold text-slate-700 shadow-sm outline-none transition-all hover:bg-slate-50 cursor-pointer"
              id="osce-report-select"
            >
              {data.map((report, idx) => (
                <option key={report._id || idx} value={idx}>
                  {report.scenario} - {report.courseName || 'General'} ({new Date(report.submittedAt).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Showing evaluation {selectedEvalIndex + 1} of {data.length}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{activeReport.scenario || 'OSCE Evaluation'}</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Evaluated on {new Date(activeReport.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            {activeReport.facultyName && (
              <p className="text-xs text-slate-400 mt-1">Evaluator: {activeReport.facultyName}</p>
            )}
          </div>
          <StatusBadge status={activeReport.overallResult} label={activeReport.overallResult === 'pass' ? 'Overall: PASS' : 'Overall: FAIL'} className="text-sm px-4 py-1.5" />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{passCount}</p>
            <p className="text-xs text-green-700 font-medium">Steps Passed</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-red-500">{(activeReport.steps || []).length - passCount}</p>
            <p className="text-xs text-red-700 font-medium">Steps Failed</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-slate-700">
              {(activeReport.steps || []).length > 0 ? Math.round((passCount / activeReport.steps.length) * 100) : 0}%
            </p>
            <p className="text-xs text-slate-600 font-medium">Score</p>
          </div>
        </div>
      </div>

      {/* Non-Technical Skill Ratings & Comments */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Non-Technical Skill Ratings</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <p className="text-[10px] font-semibold text-slate-500 uppercase">Communication</p>
            <p className="text-xl font-bold text-slate-800 mt-1">{activeReport.communicationScore || 0}/10</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <p className="text-[10px] font-semibold text-slate-500 uppercase">Technical Skill</p>
            <p className="text-xl font-bold text-slate-800 mt-1">{activeReport.technicalScore || 0}/10</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <p className="text-[10px] font-semibold text-slate-500 uppercase">Decision Making</p>
            <p className="text-xl font-bold text-slate-800 mt-1">{activeReport.decisionMakingScore || 0}/10</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <p className="text-[10px] font-semibold text-slate-500 uppercase">Clinical Safety</p>
            <p className="text-xl font-bold text-slate-800 mt-1">{activeReport.safetyScore || 0}/10</p>
          </div>
        </div>

        {activeReport.comments && (
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Overall Evaluation Comments</h4>
            <p className="text-slate-700 text-xs leading-relaxed italic bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              "{activeReport.comments}"
            </p>
          </div>
        )}
      </div>

      {/* Checklist */}
      {activeReport.steps && activeReport.steps.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Skill Checklist</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {activeReport.steps.map((step, i) => (
              <div key={step.id} className={`px-5 py-4 ${step.result === 'pass' ? 'bg-green-50/30' : 'bg-red-50/30'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5
                    ${step.result === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {step.result === 'pass' ? '✓' : '✕'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-800">{i + 1}. {step.description}</p>
                      <StatusBadge status={step.result} className="flex-shrink-0" />
                    </div>
                    {step.notes && (
                      <div className="mt-2 flex gap-2">
                        <span className="text-xs text-slate-400">Faculty note:</span>
                        <p className="text-xs text-slate-600 italic">"{step.notes}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs text-slate-400">This is a read-only view of your OSCE evaluation submitted by your faculty.</p>
      </div>
    </div>
  )
}
