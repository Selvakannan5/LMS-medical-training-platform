import express from 'express'
import mongoose from 'mongoose'
import { protect } from '../middleware.js'
import CourseProgress from '../models/CourseProgress.js'
import Course from '../models/Course.js'
import Program from '../models/Program.js'
import Enrollment from '../models/Enrollment.js'
import { Certificate, Simulation, Notification } from '../models/SimpleModels.js'
import User from '../models/User.js'
import OSCEEvaluation from '../models/OSCEEvaluation.js'

const router = express.Router()

router.get('/dashboard', protect, async (req, res) => {
  try {
    const learnerId = req.user.id

    const progressRecords = await CourseProgress.find({ learnerId }).lean()
    const coursesMapped = await Promise.all(
      progressRecords.map(async (cp) => {
        const course = await Course.findOne({ id: cp.courseId }).lean()
        const program = await Program.findOne({ id: course?.programId }).lean()
        
        let nextModuleTitle = 'Not Started'
        if (course && course.modules) {
          const nextMod = course.modules.find(m => !cp.completedModules.includes(m.id))
          if (nextMod) {
            nextModuleTitle = nextMod.title
          } else if (!cp.postTestPassed) {
            nextModuleTitle = 'Post-Test'
          } else {
            nextModuleTitle = 'Completed'
          }
        }

        return {
          id: cp.id,
          courseId: cp.courseId,
          courseName: course?.name || 'Medical Training Course',
          programCode: program?.code || 'MED',
          progress: cp.progress || 0,
          nextModule: nextModuleTitle,
          status: cp.status || 'not_started',
          preTestPassed: cp.preTestPassed,
          postTestPassed: cp.postTestPassed
        }
      })
    )

    // Calculate available courses (not enrolled yet)
    const enrolledCourseIds = progressRecords.map(cp => cp.courseId)
    const allCourses = await Course.find().lean()
    const availableCourses = []

    for (const course of allCourses) {
      if (!enrolledCourseIds.includes(course.id)) {
        const program = await Program.findOne({ id: course.programId }).lean()
        availableCourses.push({
          id: course.id,
          name: course.name,
          programCode: program?.code || 'MED',
          description: course.description || 'Medical Training Course Description'
        })
      }
    }

    const notifications = await Notification.find({
      $or: [
        { learnerId },
        { learnerId: { $exists: false } },
        { learnerId: null }
      ]
    }).sort({ createdAt: -1 }).lean()

    res.json({
      courses: coursesMapped,
      availableCourses,
      simulations: await Simulation.find().lean(),
      certificates: await Certificate.find({ learnerId }).lean(),
      notifications,
    })
  } catch (error) {
    console.error('Fetch dashboard error:', error)
    res.status(500).json({ message: 'Server error loading dashboard' })
  }
})

// POST /enroll - Enroll learner in a course
router.post('/enroll', protect, async (req, res) => {
  try {
    const { courseId } = req.body
    const learnerId = req.user.id

    const course = await Course.findOne({ id: courseId }).lean()
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    // Check if already enrolled
    const existingProgress = await CourseProgress.findOne({ learnerId, courseId })
    if (existingProgress) {
      return res.status(400).json({ message: 'Already enrolled in this course' })
    }

    // Create CourseProgress
    await CourseProgress.create({
      id: 'cp_' + courseId + '_' + learnerId,
      learnerId,
      courseId,
      progress: 0,
      preTestPassed: false,
      postTestPassed: false,
      completedModules: [],
      unlockedModules: course.modules?.length > 0 ? [course.modules[0].id] : [],
      status: 'not_started'
    })

    // Create legacy Enrollment
    await Enrollment.create({
      id: 'e_' + courseId + '_' + learnerId,
      learnerId,
      courseId,
      progress: 0,
      status: 'in_progress',
      enrolledAt: new Date().toISOString()
    })

    res.json({ success: true, message: 'Enrolled successfully' })
  } catch (error) {
    console.error('Course enrollment error:', error)
    res.status(500).json({ message: 'Server error enrolling in course' })
  }
})

// GET /notifications - Get learner notifications
router.get('/notifications', protect, async (req, res) => {
  try {
    const learnerId = req.user.id
    const notifications = await Notification.find({
      $or: [
        { learnerId },
        { learnerId: { $exists: false } },
        { learnerId: null }
      ]
    }).sort({ createdAt: -1 }).lean()
    res.json(notifications)
  } catch (error) {
    console.error('Fetch notifications error:', error)
    res.status(500).json({ message: 'Server error loading notifications' })
  }
})

// GET /osce/:learnerId - Get learner-specific OSCE evaluations
router.get('/osce/:learnerId', protect, async (req, res) => {
  try {
    const { learnerId } = req.params

    // Security check: learners can only view their own evaluations, faculty/admin can view any
    if (req.user.role === 'learner' && req.user.id !== learnerId) {
      return res.status(403).json({ message: 'Access denied: You can only view your own OSCE evaluations' })
    }

    const evaluations = await OSCEEvaluation.find({ learnerId })
      .sort({ createdAt: -1 })
      .lean()

    const mapped = await Promise.all(
      evaluations.map(async (e) => {
        const course = await Course.findOne({ id: e.courseId }).lean()
        const faculty = await User.findOne({ id: e.facultyId }).lean()
        
        // Map checklistScores back to the frontend-expected steps structure
        const steps = (e.checklistScores || []).map((scoreObj, idx) => ({
          id: `step${idx + 1}`,
          description: scoreObj.item,
          result: scoreObj.score === 1 ? 'pass' : 'fail',
          notes: ''
        }))

        return {
          ...e,
          submittedAt: e.createdAt,
          overallResult: e.status,
          courseName: course?.name || 'Unknown Course',
          facultyName: faculty?.name || 'Unknown Faculty',
          steps
        }
      })
    )

    res.json(mapped)
  } catch (error) {
    console.error('Fetch learner OSCE error:', error)
    res.status(500).json({ message: 'Server error loading OSCE evaluations' })
  }
})

// POST /notifications/:id/read - Mark a notification as read
router.post('/notifications/:id/read', protect, async (req, res) => {
  try {
    const { id } = req.params
    const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { id: id }
    await Notification.updateOne(query, { $set: { read: true } })
    res.json({ success: true })
  } catch (error) {
    console.error('Mark notification as read error:', error)
    res.status(500).json({ message: 'Server error marking notification as read' })
  }
})

// POST /notifications/read-all - Mark all notifications for the learner as read
router.post('/notifications/read-all', protect, async (req, res) => {
  try {
    const learnerId = req.user.id
    await Notification.updateMany(
      {
        $or: [
          { learnerId },
          { learnerId: { $exists: false } },
          { learnerId: null }
        ],
        read: false
      },
      { $set: { read: true } }
    )
    res.json({ success: true })
  } catch (error) {
    console.error('Mark all notifications as read error:', error)
    res.status(500).json({ message: 'Server error marking all notifications as read' })
  }
})

export default router