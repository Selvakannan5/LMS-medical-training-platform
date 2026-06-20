import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useToast } from '@/context/ToastContext'
import { format } from 'date-fns'

export default function AssessmentReview() {
  const toast = useToast()
  const [expanded, setExpanded] = useState(null)
  const [flagged, setFlagged] = useState({})

  const { data: submissions = [], isLoading, error } = useQuery({
    queryKey: ['faculty-assessments'],
    queryFn: () => api.get('/faculty/assessments/results').then(r => r.data),
  })

  const handleFlag = (id) => {
    setFlagged(prev => ({ ...prev, [id]: !prev[id] }))
    toast.info(flagged[id] ? 'Flag removed' : 'Submission flagged for review')
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
  if (error) return <div className="text-red-500 text-sm text-center py-16">Failed to load assessments database.</div>

  const totalSubmissions = submissions.length
  const passedCount = submissions.filter(s => s.passed).length
  const failedCount = submissions.filter(s => !s.passed).length

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Assessment Review</h1>
        <p className="text-slate-500 text-sm mt-0.5">Review recent test submissions and question performance from your learners</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-bold text-slate-800">{totalSubmissions}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Total Submissions</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-bold text-green-600">{passedCount}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Passed</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-bold text-red-500">{failedCount}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Failed</p>
        </div>
      </div>

      {/* Submissions list */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Recent Submissions</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">No test submissions available.</div>
          ) : (
            submissions.map(sub => (
              <div key={sub.resultId} id={`submission-${sub.resultId}`}>
                <div
                  className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === sub.resultId ? null : sub.resultId)}
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {sub.learnerName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm">{sub.learnerName}</p>
                    <p className="text-xs text-slate-500">{sub.courseName} · {sub.assessmentTitle} · {format(new Date(sub.submittedAt), 'MMM d, yyyy · h:mm a')}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${sub.passed ? 'text-green-600' : 'text-red-500'}`}>{sub.score}%</span>
                    <StatusBadge status={sub.passed ? 'pass' : 'fail'} />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleFlag(sub.resultId) }}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${flagged[sub.resultId] ? 'bg-amber-100 text-amber-600' : 'text-slate-300 hover:text-amber-500 hover:bg-amber-50'}`}
                      id={`flag-${sub.resultId}`}
                      title="Flag for review"
                    >
                      🚩
                    </button>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${expanded === sub.resultId ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {expanded === sub.resultId && (
                  <div className="px-5 pb-5 bg-slate-50/50 border-t border-slate-100/85">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                      <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                        <p className="text-lg font-bold text-slate-800">{sub.score}%</p>
                        <p className="text-xs text-slate-500">Score Obtained</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                        <p className={`text-lg font-bold ${sub.passed ? 'text-green-600' : 'text-red-500'}`}>{sub.passed ? 'PASSED' : 'FAILED'}</p>
                        <p className="text-xs text-slate-500">Final Status</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                        <p className="text-lg font-bold text-slate-800">{sub.correct} / {sub.total}</p>
                        <p className="text-xs text-slate-500">Correct Answers</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                        <p className="text-lg font-bold text-slate-800">70%</p>
                        <p className="text-xs text-slate-500">Pass Threshold</p>
                      </div>
                    </div>

                    {flagged[sub.resultId] && (
                      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                        <span>🚩</span>
                        <p className="text-xs text-amber-800 font-medium">This submission has been flagged for detailed faculty review.</p>
                      </div>
                    )}

                    {/* Question Breakdown */}
                    {sub.review && sub.review.length > 0 && (
                      <div className="mt-4 bg-white rounded-xl p-4 border border-slate-100/80 shadow-sm space-y-3">
                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Question Performance Breakdown</p>
                        <div className="space-y-3 divide-y divide-slate-100">
                          {sub.review.map((item, idx) => (
                            <div key={idx} className="flex gap-2.5 text-xs pt-3 first:pt-0 first:border-none">
                              <span className="text-base">{item.isCorrect ? '✅' : '❌'}</span>
                              <div className="space-y-1">
                                <p className="font-semibold text-slate-800">{item.questionText}</p>
                                <p className={`text-[10px] font-bold ${item.isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                  {item.isCorrect ? 'Passed Concept' : 'Weak Concept'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
