import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useToast } from '@/context/ToastContext'
import { queryClient } from '@/lib/queryClient'



function ModuleQuizSection({ moduleId, onQuizPassed }) {
  const toast = useToast()
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizResult, setQuizResult] = useState(null)

  const { data: quiz, isLoading, error, refetch } = useQuery({
    queryKey: ['quiz', moduleId],
    queryFn: () => api.get(`/modules/${moduleId}/quiz`).then(r => r.data),
    enabled: !!moduleId
  })

  // Reset states when the module changes
  useEffect(() => {
    setQuizResult(null)
    setSelectedAnswers({})
  }, [moduleId])

  const submitMutation = useMutation({
    mutationFn: (answers) => api.post(`/modules/${moduleId}/submit`, { answers }).then(r => r.data),
    onSuccess: (data) => {
      setQuizResult(data)
      if (data.passed) {
        toast.success(`Passed! You scored ${data.score}%.`)
        onQuizPassed()
      } else {
        toast.error(`Not passed. You scored ${data.score}%. Required is 100%.`)
      }
    },
    onError: () => toast.error('Failed to submit quiz answers')
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="md" />
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="text-center text-slate-500 py-8 border border-slate-100 rounded-xl bg-slate-50">
        No quiz available for this module.
      </div>
    )
  }

  const questions = quiz.questions || []

  const handleOptionChange = (qId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIndex
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Verify all questions are answered
    if (Object.keys(selectedAnswers).length < questions.length) {
      toast.warn('Please answer all questions before submitting.')
      return
    }
    submitMutation.mutate(selectedAnswers)
  }

  const handleRetry = () => {
    setQuizResult(null)
    setSelectedAnswers({})
  }

  // Quiz Results View
  if (quizResult) {
    const { score, passed, correct, total, review } = quizResult
    return (
      <div className="space-y-6 animate-fade-in">
        <div className={`rounded-2xl p-6 text-center border ${passed ? 'bg-green-50/50 border-green-200 text-green-800' : 'bg-rose-50/50 border-rose-200 text-rose-800'}`}>
          <span className="text-5xl block mb-2">{passed ? '🎉' : '✍️'}</span>
          <h4 className="text-2xl font-bold mb-1">{passed ? 'Quiz Passed!' : 'Quiz Attempt Failed'}</h4>
          <p className="text-sm opacity-90 mb-4">You scored {score}% ({correct}/{total} correct). Required pass score is 100% (5/5).</p>
          
          {passed ? (
            <span className="px-4 py-2 bg-green-600 text-white font-bold text-sm rounded-lg inline-block">
              Module Complete
            </span>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg transition-colors inline-block"
              >
                Retry Quiz
              </button>
              <p className="text-xs opacity-75">Review the study materials in the first tab and try again.</p>
            </div>
          )}
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50">
            <h4 className="font-bold text-slate-800 text-sm">Question Review</h4>
          </div>
          <div className="divide-y divide-slate-100">
            {review.map((r, idx) => {
              const originalQuestion = questions.find(q => q.id === r.questionId)
              if (!originalQuestion) return null
              
              return (
                <div key={r.questionId} className={`p-5 ${r.isCorrect ? 'bg-green-50/20' : 'bg-rose-50/20'}`}>
                  <div className="flex gap-3">
                    <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${r.isCorrect ? 'bg-green-500 text-white' : 'bg-rose-500 text-white'}`}>
                      {r.isCorrect ? '✓' : '✕'}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800 mb-2">{idx + 1}. {originalQuestion.text}</p>
                      <div className="space-y-1.5">
                        {originalQuestion.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`flex items-center gap-2 text-xs py-1.5 px-3 rounded
                              ${oIdx === r.correct ? 'bg-green-100/50 text-green-800 font-semibold' : ''}
                              ${oIdx === r.selected && !r.isCorrect ? 'bg-rose-100/50 text-rose-800 line-through' : ''}
                              ${oIdx !== r.correct && oIdx !== r.selected ? 'text-slate-500' : ''}
                            `}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center text-[8px]
                              ${oIdx === r.correct ? 'border-green-600 bg-green-600 text-white' : 'border-slate-300'}
                            `}>
                              {oIdx === r.correct ? '✓' : ''}
                            </span>
                            <span>{opt}</span>
                            {oIdx === r.selected && !r.isCorrect && (
                              <span className="text-rose-500 font-medium ml-1">(Your choice)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Quiz Taking View
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center text-sm">
        <span className="font-semibold text-slate-700">Mandatory Assessment</span>
        <span className="text-slate-500">5 Questions · 100% passing score</span>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800 mb-4">{idx + 1}. {q.text}</p>
            <div className="grid grid-cols-1 gap-2.5">
              {q.options.map((opt, oIdx) => {
                const inputId = `quiz-${q.id}-opt-${oIdx}`
                const isChecked = selectedAnswers[q.id] === oIdx
                
                return (
                  <label
                    key={oIdx}
                    htmlFor={inputId}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all text-xs font-medium
                      ${isChecked
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={`question-${q.id}`}
                      checked={isChecked}
                      onChange={() => handleOptionChange(q.id, oIdx)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span>{opt}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-2"
      >
        {submitMutation.isPending && <LoadingSpinner size="sm" color="text-white" />}
        Submit Quiz Answers
      </button>
    </form>
  )
}

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

export default function CourseView() {
  const { id } = useParams()
  const toast = useToast()
  const [currentModuleId, setCurrentModuleId] = useState(null) // selected sidebar item id ('pretest', 'posttest', or moduleId)

  const { data: course, isLoading, refetch } = useQuery({
    queryKey: ['course', id],
    queryFn: () => api.get(`/courses/${id}/modules`).then((r) => r.data),
  })

  // Select active panel when data completes loading
  useEffect(() => {
    if (course && course.modules && course.modules.length > 0) {
      const nextActive = course.modules.find(m => !m.completed && !m.locked)
      setCurrentModuleId(nextActive ? nextActive.id : course.modules[0].id)
    }
  }, [course])

  // Scroll to top of window when active module changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentModuleId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!course) {
    return <div className="text-center text-slate-500 py-16">Course not found.</div>
  }

  const modules = course.modules || []

  // Resolve current active module item
  let activeModule = null
  let showPostTestPanel = false

  if (currentModuleId === 'posttest') {
    showPostTestPanel = true
  } else {
    activeModule = modules.find(m => m.id === currentModuleId) || (modules.length > 0 ? modules[0] : null)
  }

  // Check if posttest is unlocked (all modules are complete)
  const isPostTestUnlocked = modules.length > 0 && modules.every(m => m.completed)

  const handleQuizPassed = () => {
    refetch()
  }

  return (
    <div className="space-y-4 animate-fade-in pb-12">
      {/* Header crumbs */}
      <div className="flex items-center gap-3">
        <Link to="/learner" className="text-slate-400 hover:text-slate-600 transition-colors text-xs font-semibold">
          ← Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600 font-medium text-xs truncate">{course.name}</span>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm shadow-slate-100/30">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">{course.name}</h1>
            <p className="text-xs text-slate-500 mt-0.5">Sequential Learner Workflow</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-blue-600">{course.progress || 0}% Complete</span>
          </div>
        </div>
        <ProgressBar value={course.progress || 0} color="blue" showPercent={false} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-800 text-sm">Course Flow</h2>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Pre-Test Item */}
              <button
                onClick={() => {
                  setCurrentModuleId('pretest')
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors text-xs font-semibold cursor-pointer hover:bg-slate-50
                  ${currentModuleId === 'pretest' ? 'bg-blue-50 text-blue-800' : 'text-slate-700'}
                `}
              >
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]
                  ${course.preTestPassed
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-500 text-white'
                  }
                `}>
                  {course.preTestPassed ? '✓' : '📝'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">Course Pre-Test</p>
                  <p className="text-[10px] text-slate-400 font-medium">Baseline Assessment</p>
                </div>
              </button>

              {/* Modules Items */}
              {modules.map((mod, idx) => {
                const isActive = currentModuleId === mod.id
                return (
                  <button
                    key={mod.id}
                    disabled={mod.locked}
                    onClick={() => {
                      setCurrentModuleId(mod.id)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors text-xs font-semibold
                      ${mod.locked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'}
                      ${isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-700'}
                    `}
                  >
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]
                       ${mod.completed
                         ? 'bg-green-500 text-white'
                         : mod.locked
                           ? 'bg-slate-200 text-slate-400'
                           : 'bg-blue-600 text-white'
                       }
                    `}>
                      {mod.completed ? '✓' : mod.locked ? '🔒' : idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate font-semibold ${isActive ? 'text-blue-800' : 'text-slate-700'}`}>
                        {mod.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">{mod.duration}</p>
                    </div>
                  </button>
                )
              })}

              {/* Posttest Item */}
              <button
                disabled={!isPostTestUnlocked}
                onClick={() => setCurrentModuleId('posttest')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors text-xs font-semibold
                  ${!isPostTestUnlocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'}
                  ${currentModuleId === 'posttest' ? 'bg-blue-50 text-blue-800' : 'text-slate-700'}
                `}
              >
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]
                  ${course.postTestPassed
                    ? 'bg-green-500 text-white'
                    : !isPostTestUnlocked
                      ? 'bg-slate-200 text-slate-400'
                      : 'bg-purple-600 text-white'
                  }
                `}>
                  {course.postTestPassed ? '✓' : '🏆'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">Final Post-Test</p>
                  <p className="text-[10px] text-slate-400 font-medium">Certificate Eligibility</p>
                </div>
              </button>

              {/* AI Feedback Item */}
              {course.aiFeedback && (
                <button
                  onClick={() => setCurrentModuleId('aifeedback')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors text-xs font-semibold cursor-pointer hover:bg-slate-50
                    ${currentModuleId === 'aifeedback' ? 'bg-blue-50 text-blue-800' : 'text-slate-700'}
                  `}
                  id="course-flow-ai-feedback"
                >
                  <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] bg-blue-100 text-blue-600">
                    🤖
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">AI Performance Analysis</p>
                    <p className="text-[10px] text-slate-400 font-medium">Diagnostic Feedback</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-3">

          {/* PANEL 1: Pre-Test Block */}
          {currentModuleId === 'pretest' && (
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm text-center max-w-xl mx-auto space-y-4">
              <span className="text-6xl block">📝</span>
              <h2 className="text-xl font-bold text-slate-800">Course Pre-Test</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Take the baseline Course Pre-Test to evaluate your initial knowledge. This test is available to complete, but does not block you from starting the learning modules immediately.
              </p>
              {course.preTestPassed ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-semibold inline-block">
                  ✓ Pre-Test completed successfully!
                </div>
              ) : (
                <div className="pt-2">
                  <Link
                    to={`/learner/assessment/${course.preTestId}`}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md transition-colors inline-block"
                  >
                    Start Course Pre-Test
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* PANEL 4: AI Feedback Block */}
          {currentModuleId === 'aifeedback' && course.aiFeedback && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span>🤖</span> AI Performance Feedback
                </h2>
                <p className="text-xs text-slate-500 mt-1">Rule-based clinical diagnostic feedback based on your test results.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50/30 to-purple-50/30 border border-blue-100/80 rounded-xl p-5 min-h-48">
                <div className="prose prose-sm max-w-none">
                  <div className="list-none p-0 m-0 space-y-1">
                    {formatFeedback(course.aiFeedback)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PANEL 2: Post-Test Block */}
          {showPostTestPanel && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm text-center max-w-xl mx-auto space-y-4">
              <span className="text-6xl block">🏆</span>
              <h2 className="text-xl font-bold text-slate-800">Final Post-Test</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Congratulations on completing all 6 modules and quizzes! You are now eligible to take the final evaluation. 70% passing score is required to unlock your certification.
              </p>

              {course.postTestPassed ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-semibold inline-block">
                    ✓ Course Completed! Certificate generated successfully.
                  </div>
                  <div>
                    <Link
                      to="/learner/certificates"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors inline-block"
                    >
                      View Certificates
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <Link
                    to={`/learner/assessment/${course.postTestId}`}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md shadow-purple-600/10 transition-colors inline-block"
                  >
                    Start Final Post-Test
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* PANEL 3: Active Module Learning Experience */}
          {activeModule && currentModuleId !== 'pretest' && currentModuleId !== 'posttest' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8 animate-fade-in">
              {/* Sticky Progress Indicator Header */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100 py-3.5 px-6 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{course.name}</span>
                  <h2 className="text-base font-extrabold text-slate-800 leading-tight mt-0.5">{activeModule.title}</h2>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto text-right">
                  <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{activeModule.duration}</span>
                  <div className="h-4 w-px bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600">{course.progress || 0}% Complete</span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress || 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Handbook-Style Main Content */}
              <div className="max-w-3xl mx-auto space-y-8">
                
                {/* 1. Learning Objectives */}
                <div className="bg-emerald-50/50 border-l-4 border-emerald-500 rounded-r-xl p-5 mb-6 shadow-sm">
                  <h4 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    🎯 Learning Objectives
                  </h4>
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    {activeModule.learningObjectives || 'Analyze critical steps for assessment and rapid intervention.'}
                  </p>
                </div>

                {/* 2. Core Study Content (Textbook/Handbook Style) */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
                    📖 Core Clinical Content
                  </h4>
                  <p className="font-serif text-slate-800 text-base md:text-lg leading-relaxed antialiased whitespace-pre-line tracking-wide bg-slate-50/30 p-5 rounded-2xl border border-slate-100/50">
                    {activeModule.studyContent}
                  </p>
                </div>

                {/* 3. Clinical Scenario Card */}
                {activeModule.clinicalScenario && (
                  <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-extrabold text-indigo-950 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                      🩺 Clinical Case Scenario
                    </h4>
                    <p className="text-xs text-indigo-900 leading-relaxed italic whitespace-pre-line bg-white/70 p-4 rounded-xl border border-indigo-100/50">
                      {activeModule.clinicalScenario}
                    </p>
                  </div>
                )}

                {/* 4. Algorithm Flow Section */}
                {activeModule.algorithm && (
                  <div className="bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-800">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                      ⚡ Emergency Resuscitation Algorithm
                    </h4>
                    <div className="font-mono text-[11px] text-emerald-400 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed whitespace-pre-line overflow-x-auto">
                      {activeModule.algorithm}
                    </div>
                  </div>
                )}

                {/* 5. Important Clinical Notes */}
                {activeModule.importantNotes && (
                  <div className="bg-yellow-50/60 border border-yellow-200 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-extrabold text-yellow-950 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      📌 Important Clinical Notes
                    </h4>
                    <p className="text-xs text-yellow-900 leading-relaxed whitespace-pre-line">
                      {activeModule.importantNotes}
                    </p>
                  </div>
                )}

                {/* 6. Common Mistakes & Critical Safety Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeModule.commonMistakes && (
                    <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-6 shadow-sm">
                      <h4 className="font-extrabold text-rose-950 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2">
                        ❌ Common Mistakes to Avoid
                      </h4>
                      <p className="text-xs text-rose-900 leading-relaxed whitespace-pre-line bg-white/50 p-4 rounded-xl border border-rose-100/50">
                        {activeModule.commonMistakes}
                      </p>
                    </div>
                  )}

                  {activeModule.safetyTips && (
                    <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 shadow-sm">
                      <h4 className="font-extrabold text-amber-950 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2">
                        ⚠️ Critical Safety Tips
                      </h4>
                      <p className="text-xs text-amber-900 leading-relaxed whitespace-pre-line bg-white/50 p-4 rounded-xl border border-amber-100/50">
                        {activeModule.safetyTips}
                      </p>
                    </div>
                  )}
                </div>

                {/* 7. Key Points / Quick Revision */}
                {activeModule.keyPoints && (
                  <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider mb-3">
                      💡 Quick Revision & Key Points
                    </h4>
                    <ul className="space-y-2 text-xs text-emerald-900 font-medium">
                      {Array.isArray(activeModule.keyPoints) ? (
                        activeModule.keyPoints.map((k, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <span className="text-emerald-600 mt-0.5">✓</span>
                            <span>{k}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex gap-2 items-start">
                          <span className="text-emerald-600 mt-0.5">✓</span>
                          <span className="whitespace-pre-line">{activeModule.keyPoints}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* 8. Module Summary */}
                {activeModule.summary && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                      📋 Module Summary
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {activeModule.summary}
                    </p>
                  </div>
                )}

                {/* 9. References */}
                {activeModule.references && (
                  <div className="border-t border-slate-100 pt-4 text-[10px] text-slate-400">
                    <p className="font-semibold mb-1">References & Guidelines:</p>
                    <p className="italic font-medium">{activeModule.references}</p>
                  </div>
                )}

                {/* 10. Integrated Quiz Assessment Section (Directly Below Content) */}
                <div className="border-t border-slate-200 pt-8 mt-10">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-tight">
                    ✍️ Module Assessment Quiz
                  </h3>
                  
                  {activeModule.completed ? (
                    <div className="space-y-4">
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-5 text-center font-bold text-sm">
                        ✓ Quiz Passed! You have scored 100% and unlocked the next module.
                      </div>
                      <button
                        onClick={() => {
                          const currentIndex = modules.findIndex(m => m.id === activeModule.id)
                          if (currentIndex !== -1 && currentIndex < modules.length - 1) {
                            setCurrentModuleId(modules[currentIndex + 1].id)
                          } else {
                            setCurrentModuleId('posttest')
                          }
                        }}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center shadow-md transition-colors block text-xs"
                      >
                        {modules.findIndex(m => m.id === activeModule.id) < modules.length - 1 ? 'Go to Next Module' : 'Go to Final Post-Test'}
                      </button>
                    </div>
                  ) : (
                    <ModuleQuizSection moduleId={activeModule.id} onQuizPassed={handleQuizPassed} />
                  )}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}