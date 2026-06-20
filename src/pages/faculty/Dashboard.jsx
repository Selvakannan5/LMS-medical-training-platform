import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { useAuth } from '@/context/AuthContext'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { format } from 'date-fns'

function StatCard({ icon, label, value, color = 'bg-blue-50 text-blue-600 border-blue-100', sub }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-xl mb-3`}>{icon}</div>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
      {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
    </div>
  )
}

export default function FacultyDashboard() {
  const { user } = useAuth()

  const { data, isLoading, error } = useQuery({
    queryKey: ['faculty-dashboard'],
    queryFn: () => api.get('/faculty/dashboard').then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
  if (error) return <div className="text-red-500 text-sm text-center py-16">Failed to load dashboard. Please try again.</div>

  const {
    totalLearners = 0,
    totalCourses = 0,
    totalAssessments = 0,
    averageScore = 0,
    passRate = 0,
    pendingReviews = 0,
    recentResults = [],
    upcomingSimulations = [],
    coursePerformance = [],
    batches = []
  } = data || {}

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-purple-500/10">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="absolute right-16 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/3" />
        <p className="text-purple-200 text-sm mb-1 font-medium">Faculty Portal 👩‍⚕️</p>
        <h1 className="text-2xl sm:text-3xl font-bold">{user?.name}</h1>
        <p className="text-purple-200 text-sm mt-0.5">{user?.department || 'Emergency Medicine'} · Apollo Hospitals</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard icon="👥" label="Total Learners" value={totalLearners} color="bg-blue-50 text-blue-600 border-blue-100" />
        <StatCard icon="📚" label="Total Courses" value={totalCourses} color="bg-indigo-50 text-indigo-600 border-indigo-100" />
        <StatCard icon="📝" label="Assessments" value={totalAssessments} color="bg-cyan-50 text-cyan-600 border-cyan-100" />
        <StatCard icon="📈" label="Avg Test Score" value={`${averageScore}%`} color="bg-violet-50 text-violet-600 border-violet-100" />
        <StatCard icon="🏆" label="Pass Rate" value={`${passRate}%`} color="bg-green-50 text-green-600 border-green-100" />
        <StatCard icon="🩺" label="OSCE Pending" value={pendingReviews} color="bg-amber-50 text-amber-600 border-amber-100" sub={pendingReviews > 0 ? "Requires review" : "All clear"} />
      </div>

      {/* Pending Evaluations Warning Alert */}
      {pendingReviews > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">{pendingReviews} OSCE Evaluations Pending</p>
            <p className="text-xs text-amber-600">Please evaluate clinical skill steps for learners under your supervision.</p>
          </div>
          <Link
            to="/faculty/osce/s1/u1"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            id="pending-osce-link"
          >
            Evaluate Now
          </Link>
        </div>
      )}

      {/* main content split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Recent Results & Performance */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Test Submissions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800">Recent Test Submissions</h2>
              <Link to="/faculty/assessments" className="text-xs font-semibold text-purple-600 hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-slate-50">
              {recentResults.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">No test results submitted yet.</div>
              ) : (
                recentResults.map((r) => (
                  <div key={r.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{r.learnerName}</p>
                      <p className="text-xs text-slate-500">{r.courseName} · {r.assessmentTitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${r.passed ? 'text-green-600' : 'text-red-500'}`}>{r.score}%</span>
                      <StatusBadge status={r.passed ? 'pass' : 'fail'} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Course Performance */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="font-bold text-slate-800 mb-4">Course Performance Summary</h2>
            <div className="space-y-4">
              {coursePerformance.map((c) => (
                <div key={c.courseId} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{c.courseName}</span>
                    <span className="text-slate-600">{c.averageScore}% average</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        c.averageScore >= 80 ? 'bg-green-500' : c.averageScore >= 60 ? 'bg-purple-500' : 'bg-red-400'
                      }`}
                      style={{ width: `${c.averageScore}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Sim & Batches */}
        <div className="space-y-6">
          {/* Upcoming Simulations */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-3">Upcoming Simulations</h2>
            <div className="space-y-3">
              {upcomingSimulations.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm">No scheduled simulations</div>
              ) : (
                upcomingSimulations.map((s) => (
                  <div key={s.id} className="p-3 bg-purple-50/30 border border-purple-100 rounded-xl flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-lg flex-shrink-0">🧪</div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-800 text-xs truncate">{s.scenario}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{format(new Date(s.date), 'MMM d, yyyy')} at {s.time}</p>
                      <p className="text-[10px] text-slate-400">Room: {s.room}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Batches Assigned */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-3">My Batches</h2>
            <div className="space-y-3">
              {batches.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm">No batches assigned</div>
              ) : (
                batches.map((batch) => (
                  <Link
                    key={batch.id}
                    to={`/faculty/batch/${batch.id}`}
                    className="block p-3 rounded-xl border border-slate-100 hover:border-purple-200 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-slate-800 text-xs group-hover:text-purple-600 transition-colors">{batch.name}</p>
                      <StatusBadge status={batch.status} />
                    </div>
                    <p className="text-[10px] text-slate-500">👥 {batch.enrolledCount}/{batch.maxSeats} learners</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
