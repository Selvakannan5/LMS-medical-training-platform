import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'

const RISK_FILTERS = ['All', 'High Risk', 'Medium Risk', 'Low Risk']

export default function LearnerMonitor() {
  const { id } = useParams() // keep path variable in case we want reference
  const [riskFilter, setRiskFilter] = useState('All')
  const [search, setSearch] = useState('')

  const { data: learners = [], isLoading, error } = useQuery({
    queryKey: ['faculty-learners'],
    queryFn: () => api.get('/faculty/learners').then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
  if (error) return <div className="text-red-500 text-sm text-center py-16">Failed to load learners database.</div>

  const filtered = learners.filter(l => {
    const matchRisk = riskFilter === 'All' || l.riskLevel === riskFilter
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || (l.department || '').toLowerCase().includes(search.toLowerCase())
    return matchRisk && matchSearch
  })

  // Calculate statistics for header cards
  const highRiskCount = learners.filter(l => l.riskLevel === 'High Risk').length
  const mediumRiskCount = learners.filter(l => l.riskLevel === 'Medium Risk').length
  const lowRiskCount = learners.filter(l => l.riskLevel === 'Low Risk').length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/faculty" className="text-slate-400 hover:text-slate-600 text-sm">← Dashboard</Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-700">Learner Performance Database</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Learner Monitor</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track learner progress, test scores, and risk flags across all courses</p>
        </div>
        <div className="flex gap-2">
          {RISK_FILTERS.map(f => {
            const colors = {
              'All': 'bg-slate-100 text-slate-600 hover:bg-slate-200',
              'High Risk': 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200',
              'Medium Risk': 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200',
              'Low Risk': 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
            }
            const activeColors = {
              'All': 'bg-slate-800 text-white',
              'High Risk': 'bg-red-600 text-white shadow-sm shadow-red-600/30',
              'Medium Risk': 'bg-amber-500 text-white shadow-sm shadow-amber-500/30',
              'Low Risk': 'bg-green-600 text-white shadow-sm shadow-green-600/30'
            }
            return (
              <button
                key={f}
                onClick={() => setRiskFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  riskFilter === f ? activeColors[f] : colors[f]
                }`}
                id={`filter-${f.toLowerCase().replace(' ', '-')}`}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-red-600">{highRiskCount}</p>
            <p className="text-xs text-slate-500 font-medium">Critical (High Risk)</p>
          </div>
          <span className="text-2xl">⚠️</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-amber-500">{mediumRiskCount}</p>
            <p className="text-xs text-slate-500 font-medium">Attention (Med Risk)</p>
          </div>
          <span className="text-2xl">⚡</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-green-600">{lowRiskCount}</p>
            <p className="text-xs text-slate-500 font-medium">On Track (Low Risk)</p>
          </div>
          <span className="text-2xl">✓</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        <input
          type="text"
          id="learner-search"
          placeholder="Search by learner name, department, or hospital..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="table-scroll overflow-x-auto">
          <table className="w-full text-sm" id="learner-monitor-table">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Learner</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Department</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Enrolled Courses</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Avg Progress</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Latest Result</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">OSCE Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Risk Flag</th>
                <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(l => (
                <tr key={l.learnerId} className="hover:bg-slate-50/50 transition-colors" id={`learner-row-${l.learnerId}`}>
                  {/* Name */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {l.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">{l.name}</span>
                        <p className="text-[10px] text-slate-400 font-medium">{l.email}</p>
                      </div>
                    </div>
                  </td>
                  {/* Department */}
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{l.department}</td>
                  {/* Enrolled */}
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {l.enrolledCourses.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">None</span>
                      ) : (
                        l.enrolledCourses.map((c, i) => (
                          <span key={i} className="inline-flex px-1.5 py-0.5 bg-slate-100 border border-slate-200/60 rounded text-[9px] font-semibold text-slate-600 whitespace-nowrap">
                            {c}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  {/* Avg Progress */}
                  <td className="px-5 py-4 whitespace-nowrap min-w-32">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-700 font-semibold">{l.averageProgress}%</span>
                      <div className="w-16">
                        <ProgressBar value={l.averageProgress} size="xs" color="purple" showPercent={false} />
                      </div>
                    </div>
                  </td>
                  {/* Latest Result */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    {l.latestScore !== null ? (
                      <div>
                        <span className={`text-xs font-bold ${l.latestScore >= 70 ? 'text-green-600' : 'text-red-500'}`}>
                          {l.latestScore}%
                        </span>
                        <p className="text-[9px] text-slate-400 truncate max-w-32">{l.latestAssessment}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">No submissions</span>
                    )}
                  </td>
                  {/* OSCE Status */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <StatusBadge status={l.osceStatus} />
                  </td>
                  {/* Risk Flag */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      l.riskLevel === 'High Risk' 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : l.riskLevel === 'Medium Risk' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {l.riskLevel}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        to={`/faculty/osce/s1/${l.learnerId}`}
                        className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg hover:bg-purple-200 transition-colors whitespace-nowrap"
                        id={`osce-eval-${l.learnerId}`}
                      >
                        OSCE
                      </Link>
                      <Link
                        to={`/faculty/feedback/${l.learnerId}`}
                        className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap"
                        id={`feedback-${l.learnerId}`}
                      >
                        Feedback
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">No learners found matching the criteria.</div>
          )}
        </div>
      </div>
    </div>
  )
}
