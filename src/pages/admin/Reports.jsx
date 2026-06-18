import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useToast } from '@/context/ToastContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function exportCsv(data, filename) {
  if (!data.length) return
  const headers = Object.keys(data[0])
  const rows = data.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(','))
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xl px-4 py-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <span className="font-bold">{p.value}</span></p>
      ))}
    </div>
  )
}

export default function Reports() {
  const toast = useToast()

  const { data: reports, isLoading } = useQuery({
    queryKey: ['admin-reports'],
    queryFn: () => api.get('/admin/reports/completion').then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  const { completionRates = [], instructorUtilization = [], certCompliance = {} } = reports || {}

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
        <p className="text-slate-500 text-sm mt-0.5">Export training and compliance data</p>
      </div>

      {/* Program Completion Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Program Completion Rates</h2>
          <button
            id="export-completion-csv"
            onClick={() => { exportCsv(completionRates, 'completion-rates.csv'); toast.success('CSV exported!') }}
            className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            ↓ Export CSV
          </button>
        </div>

        {/* Chart */}
        <div className="p-5 border-b border-slate-100">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={completionRates} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="program" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="enrolled"  name="Enrolled"  fill="#e2e8f0" radius={[4,4,0,0]} />
              <Bar dataKey="completed" name="Completed" fill="#2563eb"  radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="table-scroll">
          <table className="w-full text-sm" id="completion-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Program','Enrolled','Completed','Rate'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {completionRates.map(r => (
                <tr key={r.program} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{r.program}</td>
                  <td className="px-5 py-3.5 text-slate-600">{r.enrolled}</td>
                  <td className="px-5 py-3.5 text-slate-600">{r.completed}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${r.rate >= 70 ? 'bg-green-500' : r.rate >= 50 ? 'bg-amber-500' : 'bg-red-400'}`} style={{ width: `${r.rate}%` }} />
                      </div>
                      <span className="font-semibold text-slate-700">{r.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructor Utilization */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Instructor Utilization</h2>
          <button
            id="export-instructor-csv"
            onClick={() => { exportCsv(instructorUtilization, 'instructor-utilization.csv'); toast.success('CSV exported!') }}
            className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            ↓ Export CSV
          </button>
        </div>
        <div className="table-scroll">
          <table className="w-full text-sm" id="instructor-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Instructor','Sessions Conducted','Learners Evaluated'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {instructorUtilization.map(r => (
                <tr key={r.name} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{r.name}</td>
                  <td className="px-5 py-3.5 text-slate-600">{r.sessions}</td>
                  <td className="px-5 py-3.5 text-slate-600">{r.learnersEvaluated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cert Compliance */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Certification Compliance</h2>
          <button
            id="export-cert-csv"
            onClick={() => { exportCsv(certCompliance.byDept || [], 'cert-compliance.csv'); toast.success('CSV exported!') }}
            className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            ↓ Export CSV
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
          {[
            { label: 'Valid', value: certCompliance.valid, color: 'text-green-600 bg-green-50' },
            { label: 'Expiring', value: certCompliance.expiring, color: 'text-amber-600 bg-amber-50' },
            { label: 'Expired', value: certCompliance.expired, color: 'text-red-600 bg-red-50' },
          ].map(s => (
            <div key={s.label} className={`p-5 text-center ${s.color}`}>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-xs font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="table-scroll">
          <table className="w-full text-sm" id="compliance-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Department','Valid','Expiring','Expired'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {(certCompliance.byDept || []).map(r => (
                <tr key={r.dept} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{r.dept}</td>
                  <td className="px-5 py-3.5 text-green-600 font-semibold">{r.valid}</td>
                  <td className="px-5 py-3.5 text-amber-600 font-semibold">{r.expiring}</td>
                  <td className="px-5 py-3.5 text-red-500 font-semibold">{r.expired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
