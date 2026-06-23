import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/shared/Navbar'
import { Sidebar } from '@/components/shared/Sidebar'

const navItems = [
  {
    label: 'Main',
    items: [
      { to: '/learner', end: true, icon: '🏠', label: 'Dashboard', id: 'learner-dashboard' },
      { to: '/learner/osce-results', icon: '📊', label: 'OSCE Results', id: 'learner-osce' },
      { to: '/learner/certificates', icon: '🏆', label: 'Certificates', id: 'learner-certs' },
      { to: '/learner/profile', icon: '👤', label: 'Profile', id: 'learner-profile' },
    ],
  },
]

export default function LearnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const isCoursePage = location.pathname.startsWith('/learner/course/')

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {!isCoursePage && (
        <Sidebar
          navItems={navItems}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div
            className={
              isCoursePage
                ? 'p-3 sm:p-5 max-w-none w-full'
                : 'p-4 sm:p-6 max-w-7xl mx-auto w-full'
            }
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}