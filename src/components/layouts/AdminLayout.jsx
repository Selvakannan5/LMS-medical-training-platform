import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/shared/Navbar'
import { Sidebar } from '@/components/shared/Sidebar'

const navItems = [
  {
    label: 'Admin',
    items: [
      { to: '/admin',             end: true, icon: '📊', label: 'Dashboard',     id: 'admin-dashboard'   },
      { to: '/admin/users',                  icon: '👥', label: 'Users',         id: 'admin-users'       },
      { to: '/admin/reports',                icon: '📈', label: 'Reports',       id: 'admin-reports'     },
    ],
  },
  {
    label: 'Programs',
    items: [
      { to: '/admin/courses',     icon: '📚', label: 'Course Builder',   id: 'admin-courses'     },
      { to: '/admin/batches',     icon: '🗂️',  label: 'Batch Management', id: 'admin-batches'     },
      { to: '/admin/simulations', icon: '📅', label: 'Simulations',      id: 'admin-simulations' },
    ],
  },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar navItems={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
