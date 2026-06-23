import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useToast } from '@/context/ToastContext'
import { ConfirmModal } from '@/components/shared/ConfirmModal'
import { queryClient } from '@/lib/queryClient'

const PROGRAMS = ['BLS','ACLS','PALS','NALS','ATLS','BLSO']

const schema = z.object({
  name:        z.string().min(3, 'Name required'),
  code:        z.string().min(2, 'Select program type'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
})

const CONTENT_TYPES = ['video', 'pdf', 'interactive']

export default function CourseBuilder() {
  const toast = useToast()
  const [showForm, setShowForm] = useState(false)
  const [archiveTarget, setArchiveTarget] = useState(null)
  const [editingCourse, setEditingCourse] = useState(null)
  const [modules, setModules] = useState([{ id: Date.now(), title: '', type: 'video', file: '' }])
  const [dragIdx, setDragIdx] = useState(null)

  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: () => api.get('/admin/courses').then(r => r.data),
  })

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/admin/courses', { ...data, modules }),
    onSuccess: () => {
      toast.success('Course created successfully!')
      setShowForm(false)
      queryClient.invalidateQueries(['admin-courses'])
    },
    onError: () => toast.error('Failed to create course'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => api.patch(`/admin/courses/${id}`, { ...data, modules }),
    onSuccess: () => {
      toast.success('Course updated successfully!')
      setShowForm(false)
      setEditingCourse(null)
      queryClient.invalidateQueries(['admin-courses'])
    },
    onError: () => toast.error('Failed to update course'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/courses/${id}`),
    onSuccess: () => {
      toast.success('Course deleted successfully!')
      setArchiveTarget(null)
      queryClient.invalidateQueries(['admin-courses'])
    },
    onError: () => toast.error('Failed to delete course'),
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

  const addModule = () => setModules(m => [...m, { id: Date.now(), title: '', type: 'video', file: '' }])
  const removeModule = (idx) => setModules(m => m.filter((_, i) => i !== idx))
  const updateModule = (idx, field, value) => setModules(m => m.map((mod, i) => i === idx ? { ...mod, [field]: value } : mod))

  const handleDragStart = (idx) => setDragIdx(idx)
  const handleDragOver = (e, idx) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === idx) return
    setModules(m => {
      const arr = [...m]
      const [item] = arr.splice(dragIdx, 1)
      arr.splice(idx, 0, item)
      setDragIdx(idx)
      return arr
    })
  }

  const handleEditClick = async (p) => {
    try {
      const detailed = await api.get(`/admin/courses/${p.id}`).then(r => r.data)
      setEditingCourse(detailed)
      setShowForm(true)
      reset({
        name: detailed.name,
        code: detailed.code,
        description: detailed.description
      })
      if (detailed.modulesList && detailed.modulesList.length > 0) {
        setModules(detailed.modulesList.map((m, i) => ({
          id: m.id || i,
          title: m.title,
          type: m.type,
          file: m.contentUrl || ''
        })))
      } else {
        setModules([{ id: Date.now(), title: '', type: 'video', file: '' }])
      }
    } catch (e) {
      toast.error('Failed to load course details')
    }
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Course Builder</h1>
          <p className="text-slate-500 text-sm mt-0.5">{programs.length} programs available</p>
        </div>
        <button
          id="create-course-btn"
          onClick={() => { setShowForm(true); setEditingCourse(null); setModules([{ id: Date.now(), title: '', type: 'video', file: '' }]); reset() }}
          className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          + New Course
        </button>
      </div>

      {/* Programs list */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm" id="courses-table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Program', 'Code', 'Modules', 'Completion Rate', 'Duration', 'Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {programs.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors" id={`program-row-${p.id}`}>
                <td className="px-5 py-4 font-semibold text-slate-800">{p.name}</td>
                <td className="px-5 py-4"><span className="px-2 py-0.5 bg-slate-900 text-white text-xs font-bold rounded-md">{p.code}</span></td>
                <td className="px-5 py-4 text-slate-600">{p.modules}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-20">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.completionRate}%` }} />
                    </div>
                    <span className="text-slate-700 font-medium text-xs">{p.completionRate}%</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-500">{p.duration}</td>
                <td className="px-5 py-4 flex gap-2">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-200 transition-colors"
                    id={`edit-course-${p.id}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setArchiveTarget(p)}
                    className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors"
                    id={`archive-course-${p.id}`}
                  >
                    Archive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit course form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-bold text-slate-800 mb-5 text-lg">{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
          <form onSubmit={handleSubmit(data => editingCourse ? updateMutation.mutate({ id: editingCourse.id, ...data }) : createMutation.mutate(data))} id="create-course-form" className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Course Name</label>
                <input {...register('name')} id="course-name" placeholder="e.g. Basic Life Support" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Program Type</label>
                <select {...register('code')} id="program-type" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white bg-no-repeat">
                  <option value="">Select program…</option>
                  {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea {...register('description')} id="course-description" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            {/* Module builder */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">Modules</label>
                <button type="button" onClick={addModule} className="text-xs text-blue-600 hover:text-blue-700 font-medium" id="add-module-btn">+ Add Module</button>
              </div>
              <div className="space-y-2">
                {modules.map((mod, i) => (
                  <div
                    key={mod.id}
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={e => handleDragOver(e, i)}
                    onDragEnd={() => setDragIdx(null)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-move ${dragIdx === i ? 'border-blue-400 bg-blue-50 shadow-md' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                    id={`module-row-${i}`}
                  >
                    <span className="text-slate-300 select-none">⠿</span>
                    <span className="text-xs font-bold text-slate-400 w-5">{i + 1}</span>
                    <input
                      value={mod.title}
                      onChange={e => updateModule(i, 'title', e.target.value)}
                      placeholder="Module title"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
                      id={`module-title-${i}`}
                    />
                    <select
                      value={mod.type}
                      onChange={e => updateModule(i, 'type', e.target.value)}
                      className="px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none"
                      id={`module-type-${i}`}
                    >
                      {CONTENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {modules.length > 1 && (
                      <button type="button" onClick={() => removeModule(i)} className="text-slate-400 hover:text-red-500 transition-colors text-sm" id={`remove-module-${i}`}>✕</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} id="submit-course-btn" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-70 transition-colors flex items-center gap-2">
                {(createMutation.isPending || updateMutation.isPending) && <LoadingSpinner size="sm" color="text-white" />}
                {editingCourse ? 'Save Changes' : 'Create Course'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingCourse(null); }} className="px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <ConfirmModal
        isOpen={!!archiveTarget}
        title="Delete Course"
        message={`Are you sure you want to delete "${archiveTarget?.name}"? All associated courses, assessments, and quizzes will be deleted permanently.`}
        confirmLabel="Delete"
        danger
        onConfirm={() => deleteMutation.mutate(archiveTarget.id)}
        onCancel={() => setArchiveTarget(null)}
      />
    </div>
  )
}
