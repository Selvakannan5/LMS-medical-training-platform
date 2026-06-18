import React from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const PIE_COLORS = ['#2563eb', '#7c3aed', '#16a34a', '#d97706', '#dc2626', '#0891b2']

function StatCard({ icon, label, value, sub, trend, color = 'blue' }) {
  const colorMap = {
    blue:   { bg: 'from-blue-500 to-blue-600',   light: 'bg-blue-50 text-blue-600'   },
    green:  { bg: 'from-green-500 to-green-600',  light: 'bg-green-50 text-green-600'  },
    amber:  { bg: 'from-amber-500 to-amber-600',  light: 'bg-amber-50 text-amber-600'  },
    red:    { bg: 'from-red-500 to-red-600',      light: 'bg-red-50 text-red-600'      },
  }
  const c = colorMap[color]
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm shadow-slate-100 border border-slate-100 hover:shadow-md transition-shadow overflow-hidden relative">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center text-white text-xl shadow-sm`}>{icon}</div>
        {trend && <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%</span>}
      </div>
      <p className="text-3xl font-bold text-slate-800 mb-0.5">{value}</p>
      <p className="text-sm font-medium text-slate-600">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xl px-4 py-3">
      <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: <span className="font-bold">{p.value}{typeof p.value === 'number' && p.name.includes('Rate') ? '%' : ''}</span></p>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => api.get('/admin/dashboard').then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  const { stats = {}, programs = [], reports = {} } = data || {}

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Overview of all training programs and certifications</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="👥" label="Total Learners"         value={stats.totalLearners}        color="blue"  trend={+12} />
        <StatCard icon="📚" label="Active Programs"        value={stats.activePrograms}        color="green" />
        <StatCard icon="🏆" label="Certs This Month"       value={stats.certsIssuedThisMonth}  color="amber" sub="certificates issued" trend={+5} />
        <StatCard icon="⚠️" label="Expiring in 30 Days"   value={stats.expiringIn30Days}      color="red" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bar chart: completion rate per program */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100" id="chart-completion-rate">
          <h2 className="font-bold text-slate-800 mb-4">Completion Rate by Program</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={reports.completionRates || []} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="program" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="rate" name="Completion Rate" fill="#2563eb" radius={[6, 6, 0, 0]}>
                {(reports.completionRates || []).map((_, i) => (
                  <Cell key={i} fill={['#2563eb','#7c3aed','#16a34a','#d97706','#dc2626','#0891b2'][i % 6]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart: monthly enrollments */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100" id="chart-monthly-enrollments">
          <h2 className="font-bold text-slate-800 mb-4">Monthly Enrollments</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={reports.monthlyEnrollments || []} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="enrollments" name="Enrollments" stroke="#2563eb" strokeWidth={2.5} dot={{ fill: '#2563eb', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie chart + program cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Pie chart: cert compliance */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100" id="chart-cert-compliance">
          <h2 className="font-bold text-slate-800 mb-4">Cert Compliance by Department</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={reports.deptCompliance || []}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
              >
                {(reports.deptCompliance || []).map((entry, i) => (
                  <Cell key={i} fill={entry.color || PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, 'Compliance']} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Programs grid */}
        <div className="xl:col-span-2">
          <h2 className="font-bold text-slate-800 mb-3">Programs Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {programs.map((prog) => (
              <div key={prog.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow" id={`program-card-${prog.id}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 bg-slate-900 text-white rounded-md">{prog.code}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mb-2 leading-snug">{prog.name}</p>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${prog.completionRate}%` }} />
                </div>
                <p className="text-xs text-slate-400">{prog.completionRate}% completion</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
