import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { Navbar } from '@/components/shared/Navbar'
import { Sidebar } from '@/components/shared/Sidebar'

export default function FacultyLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data: learners = [] } = useQuery({
    queryKey: ['faculty-learners'],
    queryFn: () => api.get('/faculty/learners').then(r => r.data),
  })

  const firstLearnerId = learners[0]?.learnerId || 'u1'

  const navItems = [
    {
      label: 'Faculty',
      items: [
        { to: '/faculty',              end: true, icon: '📊', label: 'Dashboard',          id: 'faculty-dashboard'   },
        { to: '/faculty/batch/b1',               icon: '👥', label: 'Batch: BLS June',    id: 'faculty-batch1'      },
        { to: '/faculty/batch/b2',               icon: '👥', label: 'Batch: ACLS July',   id: 'faculty-batch2'      },
      ],
    },
    {
      label: 'Evaluations',
      items: [
        { to: `/faculty/osce/s1/${firstLearnerId}`,   icon: '🩺', label: 'OSCE Evaluation',    id: 'faculty-osce'        },
        { to: '/faculty/assessments',  icon: '📝', label: 'Assessment Review',  id: 'faculty-assessments' },
        { to: `/faculty/feedback/${firstLearnerId}`,  icon: '🤖', label: 'AI Feedback',        id: 'faculty-feedback'    },
      ],
    },
  ]

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
