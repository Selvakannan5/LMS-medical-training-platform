import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useToast } from '@/context/ToastContext'

export default function FeedbackGenerator() {
  const { learnerId } = useParams()
  const toast = useToast()
  const navigate = useNavigate()
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [feedback, setFeedback] = useState('')
  const [editedFeedback, setEditedFeedback] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const { data: learners = [] } = useQuery({
    queryKey: ['faculty-learners'],
    queryFn: () => api.get('/faculty/learners').then(r => r.data),
  })

  const { data: learnerData, isLoading: learnerLoading } = useQuery({
    queryKey: ['learner-detail', learnerId],
    queryFn: () => api.get(`/faculty/learner/${learnerId}`).then(r => r.data),
  })

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['courses-list'],
    queryFn: () => api.get('/courses').then(r => r.data),
  })

  const { user, enrollments = [], certificates = [] } = learnerData || {}

  useEffect(() => {
    if (enrollments.length > 0 && !selectedCourseId) {
      setSelectedCourseId(enrollments[0].courseId)
    }
  }, [enrollments, selectedCourseId])

  const generateMutation = useMutation({
    mutationFn: () => api.post('/faculty/feedback/generate', { 
      learnerId, 
      courseId: selectedCourseId 
    }).then(r => r.data),
    onSuccess: (res) => {
      const formattedText = `**Overall Status: ${res.overallStatus}** (${res.averageScore}% Average Score)

**Strengths**
${res.strengths.map(s => `- ${s}`).join('\n')}

**Weak Areas**
${res.weakAreas.map(w => `- ${w}`).join('\n')}

**Recommended Modules**
${res.recommendedModules.map(m => `- ${m}`).join('\n')}

**Faculty Feedback**
${res.facultyFeedback}

**Action Plan**
${res.actionPlan.map(a => `- ${a}`).join('\n')}`

      setFeedback(formattedText)
      setEditedFeedback(formattedText)
      toast.success('AI feedback generated!')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to generate feedback')
    },
  })

  const sendMutation = useMutation({
    mutationFn: () => api.post('/faculty/feedback/send', { 
      learnerId, 
      courseId: selectedCourseId, 
      feedback: editedFeedback 
    }).then(r => r.data),
    onSuccess: () => toast.success('Feedback sent to learner!'),
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to send feedback')
    }
  })

  if (learnerLoading || coursesLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  const formatFeedback = (text) => {
    if (!text) return null
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} className="font-bold text-slate-800 mt-4 mb-1 first:mt-0">{line.replace(/\*\*/g, '')}</h3>
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-slate-600 text-sm ml-4 mb-0.5">{line.slice(2)}</li>
      }
      if (line.startsWith('*')) {
        return <p key={i} className="text-xs text-slate-400 italic mt-2">{line.replace(/\*/g, '')}</p>
      }
      if (line.trim() === '') return <br key={i} />
      return <p key={i} className="text-slate-600 text-sm mb-1">{line}</p>
    })
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/faculty" className="text-slate-400 hover:text-slate-600 text-sm">← Dashboard</Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-700">AI Feedback</span>
      </div>

      {/* Learner summary */}
      {user && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
              {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-slate-800">{user.name}</h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-slate-500 text-sm font-medium">{user.department} · {user.email}</span>
                <span className="text-slate-300">|</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Switch Learner:</span>
                <select
                  value={learnerId}
                  onChange={(e) => {
                    navigate(`/faculty/feedback/${e.target.value}`)
                    setFeedback('')
                    setEditedFeedback('')
                  }}
                  className="px-2.5 py-1 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold text-slate-700 shadow-sm outline-none transition-all hover:bg-slate-50 cursor-pointer"
                  id="feedback-learner-select"
                >
                  {learners.map(l => (
                    <option key={l.learnerId} value={l.learnerId}>{l.name} ({l.department})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-slate-800">{enrollments.length}</p>
              <p className="text-xs text-slate-500">Courses Enrolled</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-green-600">{certificates.filter(c => c.status === 'valid').length}</p>
              <p className="text-xs text-slate-500">Valid Certs</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-amber-600">{certificates.filter(c => c.status === 'expiring').length}</p>
              <p className="text-xs text-slate-500">Expiring Soon</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Feedback generator */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-bold text-slate-800">AI-Generated Performance Analysis</h2>
            <p className="text-xs text-slate-500 mt-0.5">Rule-based clinical diagnostic feedback based on latest test results</p>
          </div>
          <button
            id="generate-ai-feedback-btn"
            onClick={() => generateMutation.mutate()}
            disabled={generateMutation.isPending || !selectedCourseId}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-70 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            {generateMutation.isPending ? (
              <><LoadingSpinner size="sm" color="text-white" /> Analyzing…</>
            ) : (
              <><span>🤖</span> Generate Feedback</>
            )}
          </button>
        </div>

        {/* Course Dropdown */}
        <div className="w-full md:w-1/2">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Select Enrolled Course</label>
          <select
            value={selectedCourseId}
            onChange={e => {
              setSelectedCourseId(e.target.value)
              setFeedback('')
              setEditedFeedback('')
            }}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {enrollments.map(e => {
              const c = courses.find(course => course.id === e.courseId)
              return (
                <option key={e.courseId} value={e.courseId}>
                  {c ? c.name : e.courseId}
                </option>
              )
            })}
          </select>
        </div>

        {generateMutation.isPending && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <LoadingSpinner size="lg" color="text-purple-600" />
            <p className="text-slate-500 text-sm animate-pulse">Running clinical diagnostic rules on assessment data…</p>
          </div>
        )}

        {feedback && !generateMutation.isPending && (
          <>
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
                id="edit-feedback-btn"
              >
                ✎ {isEditing ? 'Preview' : 'Edit'}
              </button>
            </div>

            {isEditing ? (
              <textarea
                value={editedFeedback}
                onChange={e => setEditedFeedback(e.target.value)}
                className="w-full h-80 px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono resize-y"
                id="feedback-editor"
              />
            ) : (
              <div className="bg-gradient-to-br from-blue-50/30 to-purple-50/30 border border-blue-100/80 rounded-xl p-5 min-h-48">
                <div className="prose prose-sm max-w-none">
                  <div className="list-none p-0 m-0 space-y-1">
                    {formatFeedback(editedFeedback)}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => sendMutation.mutate()}
                disabled={sendMutation.isPending}
                id="send-feedback-btn"
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm shadow-green-600/30"
              >
                {sendMutation.isPending && <LoadingSpinner size="sm" color="text-white" />}
                ✉ Send to Learner
              </button>
              <button
                onClick={() => generateMutation.mutate()}
                className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                id="regenerate-feedback-btn"
              >
                🔄 Regenerate
              </button>
            </div>
          </>
        )}

        {!feedback && !generateMutation.isPending && (
          <div className="text-center py-12 text-slate-400">
            <div className="text-5xl mb-3">🤖</div>
            <p className="text-sm">Select a course and click "Generate Feedback" to run diagnostic analysis on the learner's test performance.</p>
          </div>
        )}
      </div>
    </div>
  )
}
