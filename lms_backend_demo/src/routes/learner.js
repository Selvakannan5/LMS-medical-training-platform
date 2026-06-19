import express from 'express'
import Course from '../models/Course.js'
import Program from '../models/Program.js'
import Enrollment from '../models/Enrollment.js'
import { Certificate, Simulation, Batch, Notification } from '../models/SimpleModels.js'
import { protect } from '../middleware.js'

const router = express.Router()

router.get('/dashboard', protect, async (req, res) => {
  const enrollments = await Enrollment.find({ learnerId: req.user.id }).lean()
  const programs = await Program.find().lean()
  const coursesRaw = await Course.find().lean()
  const courses = enrollments.map(e => {
    const c = coursesRaw.find(x => x.id === e.courseId)
    const p = programs.find(x => x.id === c?.programId)
    return { ...e, courseName: c?.name, programCode: p?.code, totalModules: c?.modules?.length || 0 }
  })
  const certificates = await Certificate.find({ learnerId: req.user.id }).lean()
  const batches = await Batch.find({ learners: req.user.id }).lean()
  const simulations = await Simulation.find({ batchId: { $in: batches.map(b => b.id) } }).lean()
  const notifications = await Notification.find({ read: false }).lean()
  res.json({ user: req.user, courses, simulations, certificates, notifications })
})

router.get('/notifications', async (req, res) => {
  res.json(await Notification.find().lean())
})

router.get('/certificates', protect, async (req, res) => {
  res.json(await Certificate.find({ learnerId: req.user.id }).lean())
})

export default router
