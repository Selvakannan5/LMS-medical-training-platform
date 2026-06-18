import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ConfirmModal } from '@/components/shared/ConfirmModal'
import { useToast } from '@/context/ToastContext'
import { queryClient } from '@/lib/queryClient'
import { format } from 'date-fns'

const ROLES = ['learner', 'faculty', 'admin']

export default function UserManagement() {
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [deactivateTarget, setDeactivateTarget] = useState(null)

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => api.get('/admin/users').then(r => r.data),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...patch }) => api.patch(`/admin/users/${id}`, patch),
    onSuccess: () => {
      toast.success('User updated')
      queryClient.invalidateQueries(['admin-users'])
    },
    onError: () => toast.error('Failed to update user'),
  })

  const filtered = users.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole   = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const pending = users.filter(u => u.status === 'pending')

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
        <p className="text-slate-500 text-sm mt-0.5">{users.length} registered users</p>
      </div>

      {/* Pending approvals */}
      {pending.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <h2 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-amber-500 text-white rounded-full text-xs font-bold flex items-center justify-center">{pending.length}</span>
            Pending Registrations
          </h2>
          <div className="space-y-2">
            {pending.map(u => (
              <div key={u.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-amber-100" id={`pending-${u.id}`}>
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email} · {u.department}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateMutation.mutate({ id: u.id, status: 'active' })}
                    className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
                    id={`approve-${u.id}`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateMutation.mutate({ id: u.id, status: 'inactive' })}
                    className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-200 transition-colors"
                    id={`reject-${u.id}`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            id="user-search"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', ...ROLES].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${roleFilter === r ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} id={`role-filter-${r}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="table-scroll">
          <table className="w-full text-sm" id="users-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['User', 'Email', 'Role', 'Department', 'Status', 'Last Login', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors" id={`user-row-${u.id}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <span className="font-medium text-slate-800 whitespace-nowrap">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{u.email}</td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue={u.role}
                      onChange={e => updateMutation.mutate({ id: u.id, role: e.target.value })}
                      className="px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 capitalize"
                      id={`role-select-${u.id}`}
                    >
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{u.department}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{u.lastLogin}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => u.status === 'active' ? setDeactivateTarget(u) : updateMutation.mutate({ id: u.id, status: 'active' })}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${u.status === 'active' ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                      id={`toggle-status-${u.id}`}
                    >
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">No users found.</div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deactivateTarget}
        title="Deactivate User"
        message={`Deactivate "${deactivateTarget?.name}"? They will lose access to the platform.`}
        confirmLabel="Deactivate"
        danger
        onConfirm={() => {
          updateMutation.mutate({ id: deactivateTarget.id, status: 'inactive' })
          setDeactivateTarget(null)
        }}
        onCancel={() => setDeactivateTarget(null)}
      />
    </div>
  )
}
