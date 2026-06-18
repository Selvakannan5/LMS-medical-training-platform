import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '@/context/ToastContext'

const schema = z.object({
  name:       z.string().min(2, 'Name is required'),
  department: z.string().min(2, 'Department is required'),
  email:      z.string().email('Invalid email'),
})

const TRAINING_HISTORY = [
  { id: 1, program: 'Basic Life Support',       batch: 'BLS May 2025', date: '2025-05-20', result: 'pass'  },
  { id: 2, program: 'PALS Foundation',          batch: 'PALS Oct 2024',date: '2024-10-15', result: 'pass'  },
  { id: 3, program: 'ACLS Pre-assessment',      batch: 'ACLS Jan 2024',date: '2024-01-08', result: 'fail'  },
]

export default function LearnerProfile() {
  const { user } = useAuth()
  const toast = useToast()
  const [editing, setEditing] = useState(false)

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name, department: user?.department, email: user?.email },
  })

  const onSubmit = (data) => {
    // Simulate save
    setTimeout(() => {
      toast.success('Profile updated successfully')
      setEditing(false)
    }, 500)
  }

  const initials = user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-start gap-5 mb-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
              {initials}
            </div>
            <button
              onClick={() => toast.info('Photo upload coming soon')}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-700 transition-colors"
              id="change-photo-btn"
            >
              ✎
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
            <p className="text-slate-500 text-sm">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md">{user?.role?.toUpperCase()}</span>
              <span className="text-xs text-slate-400">{user?.department}</span>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="ml-auto px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
            id="edit-profile-btn"
          >
            {editing ? 'Cancel' : '✎ Edit'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="profile-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  id="profile-name"
                  {...register('name')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
                <input
                  id="profile-dept"
                  {...register('department')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                id="profile-email"
                {...register('email')}
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                id="save-profile-btn"
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button type="button" onClick={() => setEditing(false)} className="px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Full Name', value: user?.name },
              { label: 'Email', value: user?.email },
              { label: 'Department', value: user?.department },
              { label: 'Role', value: user?.role },
              { label: 'Status', value: user?.status },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-xs text-slate-400 font-medium mb-0.5">{f.label}</p>
                <p className="text-sm font-semibold text-slate-700 capitalize">{f.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Training history */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Training History</h2>
        </div>
        <div className="table-scroll">
          <table className="w-full text-sm" id="training-history-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Program</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TRAINING_HISTORY.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{row.program}</td>
                  <td className="px-5 py-3.5 text-slate-600">{row.batch}</td>
                  <td className="px-5 py-3.5 text-slate-500">{new Date(row.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${row.result === 'pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {row.result === 'pass' ? '✓' : '✕'} {row.result.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
