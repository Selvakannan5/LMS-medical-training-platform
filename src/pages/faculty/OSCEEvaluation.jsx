import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useToast } from '@/context/ToastContext'

const DEFAULT_STEPS = [
  'Scene safety assessment',
  'Check responsiveness',
  'Call for help / activate EMS',
  'Check for breathing and pulse',
  'Start chest compressions (rate and depth)',
  'Open airway (head-tilt chin-lift)',
  'Deliver rescue breaths',
  'Attach and operate AED',
]

export default function OSCEEvaluation() {
  const { sessionId, learnerId } = useParams()
  const toast = useToast()
  const navigate = useNavigate()

  const { data: learnerData, isLoading: learnerLoading } = useQuery({
    queryKey: ['learner-detail', learnerId],
    queryFn: () => api.get(`/faculty/learner/${learnerId}`).then(r => r.data),
  })

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['courses-list'],
    queryFn: () => api.get('/courses').then(r => r.data),
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      courseId: 'c1',
      scenario: 'Emergency Care Skill Evaluation',
      communicationScore: 8,
      technicalScore: 8,
      decisionMakingScore: 8,
      safetyScore: 8,
      comments: '',
      steps: DEFAULT_STEPS.map(desc => ({ description: desc, result: 'pass', notes: '' })),
    },
  })

  const steps = watch('steps')
  const commScore = watch('communicationScore')
  const techScore = watch('technicalScore')
  const decScore = watch('decisionMakingScore')
  const safScore = watch('safetyScore')

  const calcFinalScore = () => {
    const c = parseFloat(commScore) || 0
    const t = parseFloat(techScore) || 0
    const d = parseFloat(decScore) || 0
    const s = parseFloat(safScore) || 0
    return Math.round(((c + t + d + s) / 4) * 10) / 10
  }

  const finalScore = calcFinalScore()
  const overallPass = finalScore >= 7

  const submitMutation = useMutation({
    mutationFn: (data) => {
      const checklistScores = data.steps.map(s => ({
        item: s.description,
        score: s.result === 'pass' ? 1 : 0
      }))

      return api.post('/faculty/osce/evaluate', {
        learnerId,
        courseId: data.courseId,
        scenario: data.scenario,
        checklistScores,
        communicationScore: Number(data.communicationScore),
        technicalScore: Number(data.technicalScore),
        decisionMakingScore: Number(data.decisionMakingScore),
        safetyScore: Number(data.safetyScore),
        comments: data.comments
      }).then(r => r.data)
    },
    onSuccess: () => {
      toast.success('OSCE evaluation submitted successfully!')
      navigate('/faculty')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to submit evaluation')
    },
  })

  if (learnerLoading || coursesLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  const passCount = steps.filter(s => s.result === 'pass').length

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/faculty" className="text-slate-400 hover:text-slate-600 text-sm">← Dashboard</Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-700">OSCE Evaluation Form</span>
      </div>

      {/* Header Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold flex-shrink-0">
            {learnerData?.user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || '??'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">OSCE Evaluation Sheet</h1>
            <p className="text-slate-500 text-sm">{learnerData?.user?.name || 'Loading…'} · {learnerData?.user?.department}</p>
          </div>
          <div className="sm:ml-auto text-left sm:text-right">
            <p className="text-2xl font-bold text-slate-800">{passCount}/{steps.length} Steps Passed</p>
            <p className={`text-xs font-semibold ${overallPass ? 'text-green-600' : 'text-red-500'}`}>
              {overallPass ? `✓ projected PASS (${finalScore}/10)` : `✕ projected FAIL (${finalScore}/10)`}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(data => submitMutation.mutate(data))} id="osce-evaluation-form" className="space-y-6">
        {/* Core Setup */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Evaluating Course / Program</label>
            <select
              {...register('courseId', { required: true })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Scenario Title</label>
            <input
              type="text"
              {...register('scenario', { required: true })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. Adult cardiac arrest CPR"
            />
          </div>
        </div>

        {/* Skill Steps Checklist */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
            <div className="grid grid-cols-12 gap-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Critical Skill Step</div>
              <div className="col-span-3 text-center">Assessment</div>
              <div className="col-span-3">Faculty Notes</div>
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            {steps.map((step, i) => (
              <div key={i} className={`px-5 py-3 grid grid-cols-12 gap-3 items-center ${step.result === 'pass' ? 'bg-green-50/10' : 'bg-red-50/10'}`} id={`osce-step-${i}`}>
                <div className="col-span-1 flex items-center">
                  <span className="text-sm font-bold text-slate-400">{i + 1}</span>
                </div>
                <div className="col-span-5 flex items-center">
                  <span className="text-xs font-medium text-slate-700">{step.description}</span>
                </div>
                <div className="col-span-3 flex gap-1.5 justify-center">
                  <button
                    type="button"
                    onClick={() => setValue(`steps.${i}.result`, 'pass')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${step.result === 'pass' ? 'bg-green-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400 hover:bg-green-50 hover:text-green-600'}`}
                    id={`step-${i}-pass`}
                  >
                    Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue(`steps.${i}.result`, 'fail')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${step.result === 'fail' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600'}`}
                    id={`step-${i}-fail`}
                  >
                    Fail
                  </button>
                </div>
                <div className="col-span-3">
                  <input
                    {...register(`steps.${i}.notes`)}
                    placeholder="Note step performance…"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    id={`step-${i}-notes`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Technical Scores & Comments */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Non-Technical Skill Ratings</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Communication Score (1-10)</label>
              <select
                {...register('communicationScore')}
                className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 bg-white"
              >
                {[...Array(10)].map((_, idx) => (
                  <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Technical Skill (1-10)</label>
              <select
                {...register('technicalScore')}
                className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 bg-white"
              >
                {[...Array(10)].map((_, idx) => (
                  <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Decision Making (1-10)</label>
              <select
                {...register('decisionMakingScore')}
                className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 bg-white"
              >
                {[...Array(10)].map((_, idx) => (
                  <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Clinical Safety (1-10)</label>
              <select
                {...register('safetyScore')}
                className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 bg-white"
              >
                {[...Array(10)].map((_, idx) => (
                  <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Overall Evaluation Comments</label>
            <textarea
              {...register('comments')}
              rows={3}
              placeholder="Provide comments on overall teamwork, patient management, clinical decisions..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Submit Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{passCount}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Passed Steps</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{steps.length - passCount}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Failed Steps</p>
            </div>
            <div className="text-center border-l pl-4 border-slate-100">
              <p className={`text-base font-extrabold px-3 py-0.5 rounded-lg ${overallPass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {overallPass ? 'PASS' : 'FAIL'}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Projected Result</p>
            </div>
          </div>
          <button
            id="submit-osce-btn"
            type="submit"
            disabled={submitMutation.isPending}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm shadow-purple-600/30"
          >
            {submitMutation.isPending && <LoadingSpinner size="sm" color="text-white" />}
            Submit Evaluation
          </button>
        </div>
      </form>
    </div>
  )
}
