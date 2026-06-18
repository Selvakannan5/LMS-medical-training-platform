import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useToast } from '@/context/ToastContext'

function ResultScreen({ result, assessment, onRetry }) {
  const { score, passed, correct, total, review } = result
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className={`rounded-2xl p-8 text-center mb-6 ${passed ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' : 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'}`}>
        <div className="text-6xl mb-4">{passed ? '🎉' : '😔'}</div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: passed ? '#16a34a' : '#dc2626' }}>
          {passed ? 'Congratulations!' : 'Not Passed'}
        </h2>
        <p className="text-slate-600 mb-4">You scored {score}% ({correct}/{total} correct)</p>
        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg ${passed ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
          {passed ? '✓ PASSED' : '✕ FAILED'}
        </div>
        {!passed && (
          <div className="mt-4">
            <p className="text-sm text-slate-600 mb-3">Review the recommended modules before retrying</p>
            <button
              onClick={onRetry}
              id="retry-assessment-btn"
              className="px-6 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
            >
              Retry Assessment
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Question Review</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {review.map((r, i) => {
            const q = assessment.questions.find(q => q.id === r.questionId)
            return (
              <div key={r.questionId} className={`p-5 ${r.isCorrect ? 'bg-green-50/40' : 'bg-red-50/40'}`}>
                <div className="flex gap-3">
                  <span className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${r.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {r.isCorrect ? '✓' : '✕'}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 mb-2">{i + 1}. {q?.text}</p>
                    {q?.options.map((opt, oi) => (
                      <div key={oi} className={`flex items-center gap-2 text-xs py-1 px-2 rounded mb-1
                        ${oi === r.correct ? 'text-green-700 font-semibold' : ''}
                        ${oi === r.selected && !r.isCorrect ? 'text-red-600 line-through' : ''}
                      `}>
                        <span className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center text-[10px]
                          ${oi === r.correct ? 'border-green-500 bg-green-500 text-white' : 'border-slate-300'}
                        `}>{oi === r.correct ? '✓' : ''}</span>
                        {opt}
                        {oi === r.selected && !r.isCorrect && <span className="text-red-500 ml-1">(Your answer)</span>}
                      </div>
                    ))}
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

export default function AssessmentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(null)
  const [result, setResult] = useState(null)
  const [started, setStarted] = useState(false)

  const { data: assessment, isLoading } = useQuery({
    queryKey: ['assessment', id],
    queryFn: () => api.get(`/assessments/${id}`).then(r => r.data),
  })

  // Timer
  useEffect(() => {
    if (!started || !assessment || timeLeft === null) return
    if (timeLeft === 0) { handleSubmit(); return }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, started])

  const handleStart = () => {
    setTimeLeft(assessment.timeLimit * 60)
    setStarted(true)
  }

  const submitMutation = useMutation({
    mutationFn: (payload) => api.post(`/assessments/${id}/submit`, payload).then(r => r.data),
    onSuccess: (data) => setResult(data),
    onError: () => toast.error('Failed to submit assessment'),
  })

  const handleSubmit = useCallback(() => {
    submitMutation.mutate({ assessmentId: id, answers })
  }, [id, answers])

  const handleRetry = () => {
    setResult(null)
    setCurrentQ(0)
    setAnswers({})
    setTimeLeft(assessment.timeLimit * 60)
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
  if (!assessment) return <div className="text-center text-slate-500 py-16">Assessment not found.</div>

  if (result) return <ResultScreen result={result} assessment={assessment} onRetry={handleRetry} />

  if (!started) {
    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{assessment.title}</h1>
          <div className="flex justify-center gap-6 text-sm text-slate-500 mb-6">
            <span>⏱ {assessment.timeLimit} minutes</span>
            <span>❓ {assessment.questions.length} questions</span>
            <span>✅ Pass: 70%</span>
          </div>
          <button
            id="start-assessment-btn"
            onClick={handleStart}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Start Assessment
          </button>
        </div>
      </div>
    )
  }

  const question = assessment.questions[currentQ]
  const progress = ((currentQ + 1) / assessment.questions.length) * 100
  const isLast = currentQ === assessment.questions.length - 1
  const timerDanger = timeLeft !== null && timeLeft < 120

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Timer header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-3 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">Question</span>
          <span className="font-bold text-slate-800">{currentQ + 1} / {assessment.questions.length}</span>
        </div>
        <div className={`flex items-center gap-1.5 font-mono font-bold text-lg px-3 py-1 rounded-lg ${timerDanger ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-4">
        <p className="text-lg font-semibold text-slate-800 mb-6">{currentQ + 1}. {question.text}</p>
        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <label
              key={i}
              htmlFor={`option-${i}`}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                ${answers[question.id] === i
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
            >
              <input
                id={`option-${i}`}
                type="radio"
                name={`question-${question.id}`}
                value={i}
                checked={answers[question.id] === i}
                onChange={() => setAnswers(prev => ({ ...prev, [question.id]: i }))}
                className="accent-blue-600 w-4 h-4"
              />
              <span className={`text-sm font-medium ${answers[question.id] === i ? 'text-blue-800' : 'text-slate-700'}`}>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentQ > 0 && (
          <button
            onClick={() => setCurrentQ(q => q - 1)}
            className="px-5 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm"
          >
            ← Back
          </button>
        )}
        <div className="flex-1" />
        {!isLast ? (
          <button
            id="next-question-btn"
            onClick={() => setCurrentQ(q => q + 1)}
            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            Next →
          </button>
        ) : (
          <button
            id="submit-assessment-btn"
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:opacity-70 transition-colors text-sm flex items-center gap-2"
          >
            {submitMutation.isPending && <LoadingSpinner size="sm" color="text-white" />}
            Submit Assessment
          </button>
        )}
      </div>
    </div>
  )
}
