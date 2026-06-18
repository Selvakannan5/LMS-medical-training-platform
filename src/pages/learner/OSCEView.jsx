import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'

export default function OSCEView() {
  const { sessionId, learnerId } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['osce-result', sessionId, learnerId],
    queryFn: () => api.get(`/osce/${sessionId}/${learnerId}`).then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
  if (error || !data) return (
    <div className="text-center py-16">
      <div className="text-4xl mb-3">📋</div>
      <p className="text-slate-500">OSCE results not available yet.</p>
      <Link to="/learner" className="mt-4 inline-block text-blue-600 text-sm hover:underline">← Back to Dashboard</Link>
    </div>
  )

  const passCount = data.steps.filter(s => s.result === 'pass').length

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/learner" className="text-slate-400 hover:text-slate-600 text-sm">← Dashboard</Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-700 font-medium">OSCE Results</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">OSCE Evaluation</h1>
            <p className="text-sm text-slate-500 mt-0.5">Evaluated on {new Date(data.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <StatusBadge status={data.overallResult} label={data.overallResult === 'pass' ? 'Overall: PASS' : 'Overall: FAIL'} className="text-sm px-4 py-1.5" />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{passCount}</p>
            <p className="text-xs text-green-700 font-medium">Steps Passed</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-red-500">{data.steps.length - passCount}</p>
            <p className="text-xs text-red-700 font-medium">Steps Failed</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-slate-700">{Math.round((passCount / data.steps.length) * 100)}%</p>
            <p className="text-xs text-slate-600 font-medium">Score</p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Skill Checklist</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {data.steps.map((step, i) => (
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

      <div className="text-center">
        <p className="text-xs text-slate-400">This is a read-only view of your OSCE evaluation submitted by your faculty.</p>
      </div>
    </div>
  )
}
