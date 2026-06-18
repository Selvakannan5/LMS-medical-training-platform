import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useToast } from '@/context/ToastContext'
import { queryClient } from '@/lib/queryClient'

const typeIcons = { video: '🎬', pdf: '📄', interactive: '🎮' }
const typeBg    = { video: 'bg-blue-50 text-blue-600', pdf: 'bg-red-50 text-red-600', interactive: 'bg-purple-50 text-purple-600' }

function VideoPlayer({ url }) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
      {url ? (
        <video controls className="w-full h-full"><source src={url} type="video/mp4" /><p className="text-white text-sm">Your browser does not support the video tag.</p></video>
      ) : (
        <div className="text-center text-slate-400 p-8">
          <div className="text-5xl mb-3">🎬</div>
          <p className="text-sm font-medium">Video content</p>
          <p className="text-xs mt-1 opacity-60">In production, the video would stream here</p>
        </div>
      )}
    </div>
  )
}

function PDFViewer() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden min-h-96 flex items-center justify-center">
      <div className="text-center text-slate-400 p-8">
        <div className="text-5xl mb-3">📄</div>
        <p className="text-sm font-medium">PDF / Slide Document</p>
        <p className="text-xs mt-1 opacity-60">Document viewer would embed here in production</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Open Full Screen
        </button>
      </div>
    </div>
  )
}

function InteractiveModule() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl min-h-96 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="text-5xl mb-3">🎮</div>
        <p className="text-sm font-semibold text-purple-800">Interactive Module</p>
        <p className="text-xs text-purple-600 mt-1">Simulation scenario loads here</p>
        <button className="mt-4 px-4 py-2 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition-colors">
          Launch Module
        </button>
      </div>
    </div>
  )
}

export default function CourseView() {
  const { id } = useParams()
  const toast = useToast()
  const [activeModule, setActiveModule] = useState(null)

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: () => api.get(`/courses/${id}/modules`).then(r => r.data),
  })

  const completeMutation = useMutation({
    mutationFn: (moduleId) => api.post(`/courses/${id}/modules/${moduleId}/complete`),
    onSuccess: () => {
      toast.success('Module marked as complete!')
      queryClient.invalidateQueries(['course', id])
    },
    onError: () => toast.error('Failed to update progress'),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
  if (!course) return <div className="text-center text-slate-500 py-16">Course not found.</div>

  const current = course.modules.find(m => m.id === activeModule) || course.modules.find(m => !m.completed && !m.locked) || course.modules[0]

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/learner" className="text-slate-400 hover:text-slate-600 transition-colors text-sm">← Dashboard</Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-medium text-sm truncate">{course.name}</span>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-bold text-slate-800">{course.name}</h1>
          <span className="text-sm text-slate-500">{course.progress}% complete</span>
        </div>
        <ProgressBar value={course.progress} color="auto" showPercent={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar: Module list */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800 text-sm">Modules</h2>
            </div>
            <div className="divide-y divide-slate-50">
              {course.modules.map((mod, i) => (
                <button
                  key={mod.id}
                  disabled={mod.locked}
                  onClick={() => !mod.locked && setActiveModule(mod.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors text-sm
                    ${mod.locked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'}
                    ${current?.id === mod.id ? 'bg-blue-50' : ''}
                  `}
                  id={`module-btn-${mod.id}`}
                >
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs
                    ${mod.completed ? 'bg-green-500 text-white' : mod.locked ? 'bg-slate-200 text-slate-400' : 'bg-slate-100 text-slate-600'}
                  `}>
                    {mod.completed ? '✓' : mod.locked ? '🔒' : i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium truncate ${current?.id === mod.id ? 'text-blue-700' : 'text-slate-700'}`}>{mod.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{mod.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-4">
          {current && (
            <>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${typeBg[current.type]}`}>
                    {typeIcons[current.type]}
                  </span>
                  <div>
                    <h2 className="font-bold text-slate-800">{current.title}</h2>
                    <p className="text-xs text-slate-500 capitalize">{current.type} · {current.duration}</p>
                  </div>
                </div>

                {current.type === 'video'       && <VideoPlayer url={current.contentUrl} />}
                {current.type === 'pdf'         && <PDFViewer />}
                {current.type === 'interactive' && <InteractiveModule />}

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-slate-400">Review the content before marking complete</p>
                  {!current.completed ? (
                    <button
                      id="mark-complete-btn"
                      onClick={() => completeMutation.mutate(current.id)}
                      disabled={completeMutation.isPending}
                      className="px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
                    >
                      {completeMutation.isPending ? <LoadingSpinner size="sm" color="text-white" /> : '✓'}
                      Mark as Complete
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                      <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                      Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                {course.modules.indexOf(current) > 0 && (
                  <button
                    onClick={() => setActiveModule(course.modules[course.modules.indexOf(current) - 1].id)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    ← Previous
                  </button>
                )}
                {course.modules.indexOf(current) < course.modules.length - 1 && (
                  <button
                    onClick={() => {
                      const next = course.modules[course.modules.indexOf(current) + 1]
                      if (!next.locked) setActiveModule(next.id)
                      else toast.warn('Complete the current module first')
                    }}
                    className="ml-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
