import React from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'

const typeIcons = {
  renewal:     '🔔',
  test_result: '📋',
  session:     '📅',
  default:     '📢',
}

export function NotificationDrawer({ isOpen, onClose }) {
  const { user } = useAuth()

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.get('/learner/notifications').then(r => r.data),
    enabled: isOpen && user?.role === 'learner',
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800">Notifications</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-32 text-slate-400 text-sm">
              Loading notifications…
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <span className="text-4xl mb-3">🔕</span>
              <p className="text-sm font-medium">No notifications</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`px-5 py-4 border-b border-slate-50 transition-colors hover:bg-slate-50 ${!n.read ? 'bg-blue-50/40' : ''}`}
              >
                <div className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{typeIcons[n.type] || typeIcons.default}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.read ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                      {n.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {format(new Date(n.createdAt), 'MMM d, yyyy · h:mm a')}
                    </p>
                  </div>
                  {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 flex-shrink-0">
          <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  )
}
