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
import { format } from 'date-fns'

const schema = z.object({
  name:     z.string().min(3, 'Batch name required'),
  programId:z.string().min(1, 'Select a program'),
  startDate:z.string().min(1, 'Start date required'),
  endDate:  z.string().min(1, 'End date required'),
  maxSeats: z.coerce.number().min(1).max(100),
})

export default function BatchManagement() {
  const toast = useToast()
  const [showForm, setShowForm] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState([])

  const { data: batches = [], isLoading } = useQuery({
    queryKey: ['admin-batches'],
    queryFn: () => api.get('/admin/batches').then(r => r.data),
  })

  const { data: programs = [] } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: () => api.get('/admin/courses').then(r => r.data),
  })

  const { data: faculty = [] } = useQuery({
    queryKey: ['admin-faculty'],
    queryFn: () => api.get('/admin/faculty').then(r => r.data),
  })

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/admin/batches', { ...data, faculty: selectedFaculty }),
    onSuccess: () => {
      toast.success('Batch created!')
      setShowForm(false)
      setSelectedFaculty([])
      queryClient.invalidateQueries(['admin-batches'])
    },
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

  const toggleFaculty = (id) => setSelectedFaculty(prev =>
    prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
  )

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Batch Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">{batches.length} batches</p>
        </div>
        <button id="create-batch-btn" onClick={() => { setShowForm(true); reset() }} className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
          + New Batch
        </button>
      </div>

      {/* Batches grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {batches.map(b => {
          const fill = (b.enrolledCount / b.maxSeats) * 100
          return (
            <div key={b.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow" id={`batch-card-${b.id}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800">{b.name}</h3>
                <StatusBadge status={b.status} />
              </div>
              <p className="text-xs text-slate-500 mb-3">{b.programName}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
                <span>📅 {format(new Date(b.startDate), 'MMM d')} – {format(new Date(b.endDate), 'MMM d')}</span>
                <span>👨‍🏫 {b.facultyNames?.join(', ') || 'Unassigned'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${fill >= 90 ? 'bg-red-400' : fill >= 70 ? 'bg-amber-400' : 'bg-blue-500'}`} style={{ width: `${fill}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-600">{b.enrolledCount}/{b.maxSeats}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-bold text-slate-800 mb-5 text-lg">Create New Batch</h2>
          <form onSubmit={handleSubmit(data => createMutation.mutate(data))} id="create-batch-form" className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Batch Name</label>
                <input {...register('name')} id="batch-name" placeholder="e.g. BLS June 2026" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Program</label>
                <select {...register('programId')} id="batch-program" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select program…</option>
                  {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                {errors.programId && <p className="text-red-500 text-xs mt-1">{errors.programId.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
                <input {...register('startDate')} type="date" id="batch-start" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">End Date</label>
                <input {...register('endDate')} type="date" id="batch-end" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Seats</label>
                <input {...register('maxSeats')} type="number" id="batch-seats" defaultValue={20} min={1} max={100} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* Faculty multi-select */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Assign Faculty</label>
              <div className="flex flex-wrap gap-2">
                {faculty.map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFaculty(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${selectedFaculty.includes(f.id) ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-400'}`}
                    id={`faculty-toggle-${f.id}`}
                  >
                    {selectedFaculty.includes(f.id) ? '✓ ' : ''}{f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={createMutation.isPending} id="submit-batch-btn" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-70 transition-colors flex items-center gap-2">
                {createMutation.isPending && <LoadingSpinner size="sm" color="text-white" />}
                Create Batch
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
