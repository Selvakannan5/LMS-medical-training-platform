import express from 'express'
import Course from '../models/Course.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const courses = await Course.find().lean()
  res.json(courses)
})

router.get('/:id/modules', async (req, res) => {
  const course = await Course.findOne({ id: req.params.id }).lean()
  if (!course) return res.status(404).json({ message: 'Course not found' })

  delete course._id
  delete course.__v

  res.json(course)
})

router.post('/:id/modules/:moduleId/complete', async (req, res) => {
  const course = await Course.findOne({ id: req.params.id })
  if (!course) return res.status(404).json({ message: 'Course not found' })

  const mod = course.modules.find(m => m.id === req.params.moduleId)
  if (!mod) return res.status(404).json({ message: 'Module not found' })

  mod.completed = true

  const completed = course.modules.filter(m => m.completed).length
  course.progress = Math.round((completed / course.modules.length) * 100)

  const next = course.modules.find(m => !m.completed)
  if (next) next.locked = false

  await course.save()

  res.json({ success: true, progress: course.progress })
})

export default router