import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { NotificationDrawer } from './NotificationDrawer'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'

const roleColors = {
  learner: 'bg-blue-600',
  faculty: 'bg-purple-600',
  admin:   'bg-slate-700',
}

const roleLabels = {
  learner: 'Learner',
  faculty: 'Faculty',
  admin:   'Admin',
}

export function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const { data: notifData } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.get('/learner/notifications').then(r => r.data),
    enabled: user?.role === 'learner',
  })

  const unreadCount = notifData ? notifData.filter(n => !n.read).length : 0

  const handleLogout = () => {
    logout()
    toast.info('Logged out successfully')
    navigate('/login')
  }

  const profilePath = user?.role === 'learner' ? '/learner/profile' : '#'

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '??'

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-4 sticky top-0 z-30">
        {/* Hamburger */}
        <button
          id="nav-menu-toggle"
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 mr-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">MT</span>
          </div>
          <span className="font-bold text-slate-800 text-lg hidden sm:block">MedTrain</span>
          <span className="font-bold text-blue-600 text-lg hidden sm:block">LMS</span>
        </Link>

        {/* Role badge */}
        <span className={`hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${roleColors[user?.role] || 'bg-slate-600'}`}>
          {roleLabels[user?.role] || 'Portal'}
        </span>

        <div className="flex-1" />

        {/* Notification bell */}
        <button
          id="nav-notification-bell"
          onClick={() => setNotifOpen(true)}
          className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Notifications"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Avatar dropdown */}
        <div className="relative">
          <button
            id="nav-avatar-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden md:block max-w-[120px] truncate">
              {user?.name}
            </span>
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 z-20 py-1 animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                {user?.role === 'learner' && (
                  <Link
                    to="/learner/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    id="nav-profile-link"
                  >
                    <span>👤</span> My Profile
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  id="nav-logout-btn"
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  )
}
