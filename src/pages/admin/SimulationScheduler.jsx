import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useToast } from '@/context/ToastContext'
import { queryClient } from '@/lib/queryClient'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns'

const schema = z.object({
  scenario: z.string().min(3, 'Scenario required'),
  batchId:  z.string().min(1, 'Select batch'),
  date:     z.string().min(1, 'Date required'),
  time:     z.string().min(1, 'Time required'),
  room:     z.string().min(1, 'Room required'),
})

const VIEWS = ['month', 'week']

export default function SimulationScheduler() {
  const toast = useToast()
  const [view, setView] = useState('month')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showForm, setShowForm] = useState(false)

  const { data: simulations = [], isLoading } = useQuery({
    queryKey: ['admin-simulations'],
    queryFn: () => api.get('/admin/simulations').then(r => r.data),
  })

  const { data: batches = [] } = useQuery({
    queryKey: ['admin-batches'],
    queryFn: () => api.get('/admin/batches').then(r => r.data),
  })

  const { data: faculty = [] } = useQuery({
    queryKey: ['admin-faculty'],
    queryFn: () => api.get('/admin/faculty').then(r => r.data),
  })

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/admin/simulations', data),
    onSuccess: () => {
      toast.success('Simulation session scheduled!')
      setShowForm(false)
      queryClient.invalidateQueries(['admin-simulations'])
    },
    onError: () => toast.error('Failed to schedule session'),
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

  // Calendar
  const monthStart = startOfMonth(currentDate)
  const monthEnd   = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const firstDayOfWeek = monthStart.getDay()
  const blanks = Array(firstDayOfWeek).fill(null)

  const getSimsForDay = (day) => simulations.filter(s => isSameDay(new Date(s.date), day))

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Simulation Scheduler</h1>
          <p className="text-slate-500 text-sm mt-0.5">{simulations.length} sessions scheduled</p>
        </div>
        <div className="flex gap-2">
          {VIEWS.map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${view === v ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} id={`view-${v}`}>
              {v}
            </button>
          ))}
          <button id="schedule-session-btn" onClick={() => { setShowForm(true); reset() }} className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            + New Session
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Calendar nav */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <button onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1))} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors text-lg" id="prev-month">‹</button>
          <h2 className="font-bold text-slate-800">{format(currentDate, 'MMMM yyyy')}</h2>
          <button onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1))} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors text-lg" id="next-month">›</button>
        </div>

        {/* Day headers */}
        <div className="cal-grid bg-slate-50 border-b border-slate-100">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <div key={d} className="px-2 py-2 text-center text-xs font-semibold text-slate-400">{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="cal-grid">
          {blanks.map((_, i) => <div key={`blank-${i}`} className="min-h-16 border-b border-r border-slate-50" />)}
          {days.map(day => {
            const daySims = getSimsForDay(day)
            return (
              <div
                key={day.toISOString()}
                className={`min-h-16 p-1.5 border-b border-r border-slate-50 ${!isSameMonth(day, currentDate) ? 'opacity-30' : ''} ${isToday(day) ? 'bg-blue-50' : 'hover:bg-slate-50'} transition-colors`}
                id={`cal-day-${format(day, 'yyyy-MM-dd')}`}
              >
                <div className={`text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${isToday(day) ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>
                  {format(day, 'd')}
                </div>
                {daySims.map(s => (
                  <div key={s.id} className="bg-blue-100 text-blue-800 text-[10px] font-medium px-1.5 py-0.5 rounded mb-0.5 truncate cursor-pointer hover:bg-blue-200" title={s.scenario}>
                    {s.time} {s.scenario}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Upcoming sessions list */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">All Scheduled Sessions</h2>
        </div>
        <div className="table-scroll">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Scenario','Batch','Date','Time','Room','Faculty','Status','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {simulations.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors" id={`sim-row-${s.id}`}>
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{s.scenario}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{s.batchName}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{format(new Date(s.date), 'MMM d, yyyy')}</td>
                  <td className="px-4 py-3 text-slate-600">{s.time}</td>
                  <td className="px-4 py-3 text-slate-600">{s.room}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{s.facultyName}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => toast.info('Edit (coming soon)')} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg hover:bg-blue-200" id={`edit-sim-${s.id}`}>Edit</button>
                    <button onClick={() => toast.warn('Session cancelled')} className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-lg hover:bg-red-200" id={`cancel-sim-${s.id}`}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-bold text-slate-800 mb-5 text-lg">Schedule New Session</h2>
          <form onSubmit={handleSubmit(data => createMutation.mutate(data))} id="create-simulation-form" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Scenario</label>
                <input {...register('scenario')} id="sim-scenario" placeholder="e.g. Cardiac Arrest Response" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.scenario && <p className="text-red-500 text-xs mt-1">{errors.scenario.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Batch</label>
                <select {...register('batchId')} id="sim-batch" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select batch…</option>
                  {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                {errors.batchId && <p className="text-red-500 text-xs mt-1">{errors.batchId.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                <input {...register('date')} type="date" id="sim-date" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Time</label>
                <input {...register('time')} type="time" id="sim-time" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Room</label>
                <input {...register('room')} id="sim-room" placeholder="e.g. Sim Lab A" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.room && <p className="text-red-500 text-xs mt-1">{errors.room.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Faculty</label>
                <select {...register('faculty')} id="sim-faculty" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select faculty…</option>
                  {faculty.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={createMutation.isPending} id="submit-simulation-btn" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-70 transition-colors flex items-center gap-2">
                {createMutation.isPending && <LoadingSpinner size="sm" color="text-white" />}
                Schedule Session
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
