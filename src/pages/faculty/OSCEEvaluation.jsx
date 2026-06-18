import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
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

  const { data: learnerData } = useQuery({
    queryKey: ['learner-detail', learnerId],
    queryFn: () => api.get(`/faculty/learner/${learnerId}`).then(r => r.data),
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      steps: DEFAULT_STEPS.map(desc => ({ description: desc, result: 'pass', notes: '' })),
    },
  })

  const steps = watch('steps')

  const submitMutation = useMutation({
    mutationFn: (data) => api.post(`/osce/${sessionId}/evaluate`, {
      learnerId, sessionId, steps: data.steps,
    }).then(r => r.data),
    onSuccess: () => {
      toast.success('OSCE evaluation submitted successfully!')
      navigate('/faculty')
    },
    onError: () => toast.error('Failed to submit evaluation'),
  })

  const passCount = steps.filter(s => s.result === 'pass').length
  const overallPass = passCount >= Math.ceil(steps.length * 0.7)

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/faculty" className="text-slate-400 hover:text-slate-600 text-sm">← Dashboard</Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-700">OSCE Evaluation</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold">
            {learnerData?.user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || '??'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">OSCE Evaluation</h1>
            <p className="text-slate-500 text-sm">{learnerData?.user?.name || 'Loading…'} · Session {sessionId}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-2xl font-bold text-slate-800">{passCount}/{steps.length}</p>
            <p className={`text-xs font-semibold ${overallPass ? 'text-green-600' : 'text-red-500'}`}>
              {overallPass ? '✓ PASS (projected)' : '✕ FAIL (projected)'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(data => submitMutation.mutate(data))} id="osce-evaluation-form">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
            <div className="grid grid-cols-12 gap-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Skill Step</div>
              <div className="col-span-3">Result</div>
              <div className="col-span-3">Faculty Notes</div>
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            {steps.map((step, i) => (
              <div key={i} className={`px-5 py-4 grid grid-cols-12 gap-3 items-start ${step.result === 'pass' ? 'bg-green-50/30' : 'bg-red-50/30'}`} id={`osce-step-${i}`}>
                <div className="col-span-1 flex items-center h-10">
                  <span className="text-sm font-bold text-slate-400">{i + 1}</span>
                </div>
                <div className="col-span-5 flex items-center">
                  <span className="text-sm text-slate-700">{step.description}</span>
                </div>
                <div className="col-span-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setValue(`steps.${i}.result`, 'pass')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${step.result === 'pass' ? 'bg-green-500 text-white shadow-sm' : 'bg-slate-100 text-slate-400 hover:bg-green-100 hover:text-green-600'}`}
                    id={`step-${i}-pass`}
                  >
                    ✓ Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue(`steps.${i}.result`, 'fail')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${step.result === 'fail' ? 'bg-red-500 text-white shadow-sm' : 'bg-slate-100 text-slate-400 hover:bg-red-100 hover:text-red-600'}`}
                    id={`step-${i}-fail`}
                  >
                    ✕ Fail
                  </button>
                </div>
                <div className="col-span-3">
                  <input
                    {...register(`steps.${i}.notes`)}
                    placeholder="Optional note…"
                    className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                    id={`step-${i}-notes`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary + Submit */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{passCount}</p>
              <p className="text-xs text-slate-500">Passed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{steps.length - passCount}</p>
              <p className="text-xs text-slate-500">Failed</p>
            </div>
            <div className="text-center">
              <p className={`text-lg font-bold px-3 py-0.5 rounded-lg ${overallPass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {overallPass ? 'PASS' : 'FAIL'}
              </p>
              <p className="text-xs text-slate-500">Overall</p>
            </div>
          </div>
          <button
            id="submit-osce-btn"
            type="submit"
            disabled={submitMutation.isPending}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
          >
            {submitMutation.isPending && <LoadingSpinner size="sm" color="text-white" />}
            Submit Evaluation
          </button>
        </div>
      </form>
    </div>
  )
}
