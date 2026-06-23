import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'

const typeIcons = {
  renewal:         '🔔',
  test_result:     '📋',
  session:         '📅',
  osce_evaluation: '🩺',
  default:         '📢',
}

export function NotificationDrawer({ isOpen, onClose }) {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.get('/learner/notifications').then(r => r.data),
    enabled: isOpen && user?.role === 'learner',
  })

  const unreadNotifications = notifications.filter(n => !n.read)

  const handleMarkAsRead = async (id) => {
    try {
      await api.post(`/learner/notifications/${id}/read`)
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await api.post('/learner/notifications/read-all')
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Notifications
            {unreadNotifications.length > 0 && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                {unreadNotifications.length}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
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
          ) : unreadNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <span className="text-4xl mb-3">🔕</span>
              <p className="text-sm font-medium">No new notifications</p>
            </div>
          ) : (
            unreadNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleMarkAsRead(n.id)}
                className="px-5 py-4 border-b border-slate-50 transition-colors hover:bg-slate-50/50 cursor-pointer bg-blue-50/20 flex items-start justify-between gap-3 group/notif animate-fade-in"
              >
                <div className="flex gap-3 min-w-0 flex-1">
                  <span className="text-xl flex-shrink-0 mt-0.5">{typeIcons[n.type] || typeIcons.default}</span>
                  <div className="flex-1 min-w-0">
                    {n.link ? (
                      <Link
                        to={n.link}
                        onClick={(e) => {
                          handleMarkAsRead(n.id)
                          onClose()
                        }}
                        className="text-sm font-semibold text-slate-800 hover:underline block leading-tight"
                      >
                        {n.message}
                      </Link>
                    ) : (
                      <p className="text-sm font-semibold text-slate-800 leading-tight">
                        {n.message}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400 mt-1">
                      {format(new Date(n.createdAt), 'MMM d, yyyy · h:mm a')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMarkAsRead(n.id)
                  }}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-700 opacity-0 group-hover/notif:opacity-100 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {unreadNotifications.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 flex-shrink-0 bg-slate-50/50">
            <button 
              onClick={handleMarkAllAsRead}
              className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors cursor-pointer bg-white border border-slate-200 rounded-xl hover:border-slate-300 shadow-sm"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
