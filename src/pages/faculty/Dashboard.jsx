import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { useAuth } from '@/context/AuthContext'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { format } from 'date-fns'

export default function FacultyDashboard() {
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['faculty-dashboard'],
    queryFn: () => api.get('/faculty/dashboard').then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  const { batches = [], pendingOSCE = 0, simulations = [] } = data || {}

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
        <p className="text-purple-200 text-sm mb-1">Faculty Portal 👨‍⚕️</p>
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <p className="text-purple-200 text-sm mt-0.5">{user?.department}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '🗂️', label: 'My Batches',       value: batches.length,      color: 'bg-blue-50 text-blue-600'   },
          { icon: '🩺', label: 'Pending OSCE',      value: pendingOSCE,         color: 'bg-amber-50 text-amber-600', badge: pendingOSCE > 0 },
          { icon: '📅', label: 'Upcoming Sessions', value: simulations.length,  color: 'bg-purple-50 text-purple-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl mx-auto mb-2`}>{s.icon}</div>
            <p className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-1">
              {s.value}
              {s.badge && <span className="w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">!</span>}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* My batches */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-3">My Batches</h2>
          <div className="space-y-3">
            {batches.map((batch) => (
              <Link
                key={batch.id}
                to={`/faculty/batch/${batch.id}`}
                className="block bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-purple-200 transition-all group"
                id={`faculty-batch-${batch.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">{batch.name}</h3>
                  <StatusBadge status={batch.status} />
                </div>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span>👥 {batch.enrolledCount}/{batch.maxSeats} learners</span>
                  <span>📅 {format(new Date(batch.startDate), 'MMM d')} – {format(new Date(batch.endDate), 'MMM d, yyyy')}</span>
                </div>
                <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(batch.enrolledCount / batch.maxSeats) * 100}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming simulations */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-3">Upcoming Simulations</h2>
          <div className="space-y-3">
            {simulations.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center text-slate-500 text-sm">
                No upcoming simulations
              </div>
            ) : (
              simulations.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg flex-shrink-0">🧪</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{s.scenario}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{format(new Date(s.date), 'MMM d, yyyy')} at {s.time}</p>
                      <p className="text-xs text-slate-400">Room: {s.room}</p>
                    </div>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick OSCE action */}
          {pendingOSCE > 0 && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-800">{pendingOSCE} OSCE Evaluations Pending</p>
                <p className="text-xs text-amber-600">Review and submit evaluations for your learners</p>
              </div>
              <Link
                to="/faculty/osce/s1/u1"
                className="px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors"
                id="pending-osce-link"
              >
                Evaluate →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
