import express from 'express'
import User from '../models/User.js'
import Course from '../models/Course.js'
import CourseProgress from '../models/CourseProgress.js'
import Enrollment from '../models/Enrollment.js'
import Assessment from '../models/Assessment.js'
import Result from '../models/Results.js'
import OSCEEvaluation from '../models/OSCEEvaluation.js'
import { Batch, Certificate, Simulation, Notification, AIFeedback } from '../models/SimpleModels.js'
import { protect } from '../middleware.js'

const router = express.Router()

// GET /api/faculty/dashboard
router.get('/dashboard', protect, async (req, res) => {
  try {
    const totalLearners = await User.countDocuments({ role: 'learner' })
    const totalCourses = await Course.countDocuments()
    const totalAssessments = await Assessment.countDocuments()

    const results = await Result.find().lean()
    let averageScore = 0
    let passRate = 0
    if (results.length > 0) {
      const totalScore = results.reduce((acc, r) => acc + (r.score || 0), 0)
      averageScore = Math.round(totalScore / results.length)
      const passedCount = results.filter(r => r.passed).length
      passRate = Math.round((passedCount / results.length) * 100)
    }

    // Pending OSCE reviews (learners assigned to batches of this faculty without an OSCE evaluation)
    const facultyBatches = await Batch.find({ faculty: req.user.id }).lean()
    const batchLearnerIds = facultyBatches.flatMap(b => b.learners || [])
    const completedEvaluations = await OSCEEvaluation.find({ learnerId: { $in: batchLearnerIds } }).distinct('learnerId')
    const completedSet = new Set(completedEvaluations.map(id => id.toString()))
    const pendingLearnerIds = batchLearnerIds.filter(id => !completedSet.has(id.toString()))
    const pendingReviews = pendingLearnerIds.length

    // Recent results (latest 5 results with names populated)
    const recentResultsRaw = await Result.find().sort({ createdAt: -1 }).limit(5).lean()
    const recentResults = await Promise.all(recentResultsRaw.map(async (r) => {
      const learner = await User.findOne({ id: r.learnerId }).lean()
      const course = await Course.findOne({ id: r.courseId }).lean()
      const assessment = await Assessment.findOne({ id: r.assessmentId }).lean()
      return {
        id: r._id,
        learnerName: learner?.name || 'Unknown Learner',
        courseName: course?.name || 'Unknown Course',
        assessmentTitle: assessment?.title || 'Post-Test Assessment',
        score: r.score || 0,
        passed: r.passed || false,
        submittedAt: r.createdAt
      }
    }))

    const upcomingSimulations = await Simulation.find({ batchId: { $in: facultyBatches.map(b => b.id) } }).lean()

    // CoursePerformance: average score grouped by course
    const allCourses = await Course.find().lean()
    const coursePerformance = await Promise.all(allCourses.map(async (c) => {
      const courseResults = results.filter(r => r.courseId === c.id)
      const avg = courseResults.length > 0 
        ? Math.round(courseResults.reduce((acc, r) => acc + (r.score || 0), 0) / courseResults.length)
        : 0
      return {
        courseId: c.id,
        courseName: c.name,
        averageScore: avg
      }
    }))

    res.json({
      totalLearners,
      totalCourses,
      totalAssessments,
      averageScore,
      passRate,
      pendingReviews,
      pendingLearnerIds,
      recentResults,
      upcomingSimulations,
      coursePerformance,
      batches: facultyBatches
    })
  } catch (error) {
    console.error('Faculty dashboard fetch error:', error)
    res.status(500).json({ message: 'Server error loading faculty dashboard' })
  }
})

// GET /api/faculty/learners
router.get('/learners', protect, async (req, res) => {
  try {
    const learners = await User.find({ role: 'learner' }).lean()
    const results = await Result.find().lean()
    const progresses = await CourseProgress.find().lean()
    const courses = await Course.find().lean()

    const list = await Promise.all(learners.map(async (l) => {
      const learnerProgresses = progresses.filter(p => p.learnerId === l.id)
      const enrolledCourses = learnerProgresses.map(p => {
        const c = courses.find(course => course.id === p.courseId)
        return c ? c.name : 'Unknown Course'
      })

      const averageProgress = learnerProgresses.length > 0
        ? Math.round(learnerProgresses.reduce((acc, p) => acc + (p.progress || 0), 0) / learnerProgresses.length)
        : 0

      const learnerResults = results.filter(r => r.learnerId === l.id)
      const averageScore = learnerResults.length > 0
        ? Math.round(learnerResults.reduce((acc, r) => acc + (r.score || 0), 0) / learnerResults.length)
        : 0

      // Find latest result
      let latestScore = null
      let latestAssessment = 'N/A'
      if (learnerResults.length > 0) {
        const sortedResults = [...learnerResults].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        const latest = sortedResults[0]
        latestScore = latest.score
        const ass = await Assessment.findOne({ id: latest.assessmentId }).lean()
        latestAssessment = ass ? ass.title : 'Post-Test Assessment'
      }

      // Risk Logic:
      // High Risk: average score < 50 OR progress < 30
      // Medium Risk: average score < 70 OR progress < 60
      // Low Risk: otherwise
      let riskLevel = 'Low Risk'
      if (learnerProgresses.length > 0 || learnerResults.length > 0) {
        const checkScore = learnerResults.length > 0 ? averageScore : 100
        if (checkScore < 50 || averageProgress < 30) {
          riskLevel = 'High Risk'
        } else if (checkScore < 70 || averageProgress < 60) {
          riskLevel = 'Medium Risk'
        }
      }

      const evaluations = await OSCEEvaluation.find({ learnerId: l.id }).lean()
      const osceStatus = evaluations.length > 0 
        ? (evaluations.some(e => e.status === 'pass') ? 'pass' : 'fail')
        : 'pending'

      return {
        learnerId: l.id,
        id: l.id,
        name: l.name,
        email: l.email,
        department: l.department || 'General Medicine',
        enrolledCourses,
        averageProgress,
        latestScore,
        latestAssessment,
        status: l.status || 'active',
        riskLevel,
        osceStatus
      }
    }))

    res.json(list)
  } catch (error) {
    console.error('Fetch learners error:', error)
    res.status(500).json({ message: 'Server error fetching learners list' })
  }
})

// GET /api/faculty/assessments/results
router.get('/assessments/results', protect, async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 }).lean()
    
    const mapped = await Promise.all(results.map(async (r) => {
      const learner = await User.findOne({ id: r.learnerId }).lean()
      const course = await Course.findOne({ id: r.courseId }).lean()
      const assessment = await Assessment.findOne({ id: r.assessmentId }).lean()
      return {
        resultId: r._id,
        id: r._id,
        learnerId: r.learnerId,
        learnerName: learner?.name || 'Unknown Learner',
        courseId: r.courseId,
        courseName: course?.name || 'Unknown Course',
        assessmentId: r.assessmentId,
        assessmentTitle: assessment?.title || 'Post-Test Assessment',
        score: r.score,
        correct: r.correct || 0,
        total: r.total || 10,
        passed: r.passed,
        submittedAt: r.createdAt,
        review: r.review || []
      }
    }))

    res.json(mapped)
  } catch (error) {
    console.error('Fetch assessment results error:', error)
    res.status(500).json({ message: 'Server error loading assessment submissions' })
  }
})

// POST /api/faculty/osce/evaluate
router.post('/osce/evaluate', protect, async (req, res) => {
  try {
    const {
      learnerId,
      facultyId,
      courseId,
      scenario,
      checklistScores,
      communicationScore,
      technicalScore,
      decisionMakingScore,
      safetyScore,
      comments
    } = req.body

    const activeFacultyId = facultyId || req.user.id

    if (!learnerId || !courseId || !scenario) {
      return res.status(400).json({ message: 'learnerId, courseId, and scenario are required' })
    }

    const comm = parseFloat(communicationScore) || 0
    const tech = parseFloat(technicalScore) || 0
    const dec = parseFloat(decisionMakingScore) || 0
    const saf = parseFloat(safetyScore) || 0
    
    const finalScore = Math.round(((comm + tech + dec + saf) / 4) * 10) / 10
    const status = finalScore >= 7 ? 'pass' : 'fail'

    const evaluation = await OSCEEvaluation.create({
      learnerId,
      facultyId: activeFacultyId,
      courseId,
      scenario,
      checklistScores: checklistScores || [],
      communicationScore: comm,
      technicalScore: tech,
      decisionMakingScore: dec,
      safetyScore: saf,
      finalScore,
      status,
      comments: comments || ''
    })

    // Also update CourseProgress if exists
    await CourseProgress.updateOne(
      { learnerId, courseId },
      { $set: { oscePassed: status === 'pass', status: status === 'pass' ? 'completed' : 'in_progress' } }
    )

    // Create a Notification for the learner
    try {
      const course = await Course.findOne({ id: courseId }).lean()
      const courseName = course ? course.name : 'Clinical Course'

      await Notification.create({
        id: 'n_osce_' + Date.now(),
        learnerId,
        type: 'osce_evaluation',
        message: `Your OSCE Evaluation for ${courseName} is completed. Status: ${status.toUpperCase()}. Click here to review.`,
        link: '/learner/osce-results',
        read: false,
        createdAt: new Date().toISOString()
      })
    } catch (notifError) {
      console.error('Failed to create learner notification:', notifError)
    }

    res.status(201).json({ success: true, evaluation })
  } catch (error) {
    console.error('OSCE evaluate error:', error)
    res.status(500).json({ message: 'Server error saving OSCE evaluation' })
  }
})

// GET /api/faculty/osce/evaluations
router.get('/osce/evaluations', protect, async (req, res) => {
  try {
    const evaluations = await OSCEEvaluation.find().sort({ createdAt: -1 }).lean()
    
    const mapped = await Promise.all(evaluations.map(async (e) => {
      const learner = await User.findOne({ id: e.learnerId }).lean()
      const course = await Course.findOne({ id: e.courseId }).lean()
      const faculty = await User.findOne({ id: e.facultyId }).lean()
      return {
        ...e,
        learnerName: learner?.name || 'Unknown Learner',
        courseName: course?.name || 'Unknown Course',
        facultyName: faculty?.name || 'Unknown Faculty'
      }
    }))

    res.json(mapped)
  } catch (error) {
    console.error('Fetch evaluations error:', error)
    res.status(500).json({ message: 'Server error loading evaluations' })
  }
})

// POST /api/faculty/feedback/generate
router.post('/feedback/generate', protect, async (req, res) => {
  try {
    const { learnerId, courseId } = req.body

    if (!learnerId || !courseId) {
      return res.status(400).json({ message: 'learnerId and courseId are required' })
    }

    const learner = await User.findOne({ id: learnerId }).lean()
    if (!learner) return res.status(404).json({ message: 'Learner not found' })

    const course = await Course.findOne({ id: courseId }).lean()
    if (!course) return res.status(404).json({ message: 'Course not found' })

    const results = await Result.find({ learnerId, courseId }).sort({ createdAt: -1 }).lean()
    const latestResult = results[0]

    let score = latestResult ? (latestResult.score || 0) : 0
    let passed = latestResult ? latestResult.passed : false

    let overallStatus = 'High Risk'
    let textFeedback = ''
    if (score >= 85) {
      overallStatus = 'Excellent'
      textFeedback = `${learner.name} demonstrates excellent foundational knowledge and is highly proficient. Ready for advanced clinical simulations, hands-on post-tests, and official certification.`
    } else if (score >= 70) {
      overallStatus = 'Satisfactory'
      textFeedback = `${learner.name} has passed the assessment with satisfactory performance, but should revise weak areas and clarify clinical protocols to ensure confidence.`
    } else if (score >= 50) {
      overallStatus = 'Needs Improvement'
      textFeedback = `${learner.name} requires improvement. Score is below standard clinical proficiency. Recommend targeted module revision and practice quiz review before re-attempting the final post-test.`
    } else {
      overallStatus = 'High Risk'
      textFeedback = `${learner.name} is performing at high risk. Recommend immediate faculty intervention, supervised skill sessions, and structured practice before any clinical evaluation.`
    }

    const weakAreas = []
    const strengths = []
    const recommendedModules = []

    if (latestResult && latestResult.review && latestResult.review.length > 0) {
      latestResult.review.forEach(item => {
        const text = (item.questionText || '').toLowerCase()
        const isCorrect = item.isCorrect || (item.score > 0)
        
        if (course.id === 'c4' || course.name.toLowerCase().includes('neonatal') || course.name.toLowerCase().includes('nals')) {
          if (text.includes('mrsopa') || text.includes('chest rise')) {
            if (isCorrect) strengths.push('MR SOPA Corrective Steps')
            else {
              weakAreas.push('MR SOPA Corrective Steps')
              recommendedModules.push('NALS Module 4: Corrective Steps (MR SOPA)')
            }
          }
          if (text.includes('compression') || text.includes('heart rate')) {
            if (isCorrect) strengths.push('Compression Depth & Rate')
            else {
              weakAreas.push('Chest Compressions & Medications')
              recommendedModules.push('NALS Module 5: Chest Compressions & Medications')
            }
          }
          if (text.includes('epinephrine') || text.includes('adrenaline')) {
            if (isCorrect) strengths.push('Medication Administration')
            else {
              weakAreas.push('Medications Escalation')
              recommendedModules.push('NALS Module 5: Medications')
            }
          }
          if (text.includes('volume')) {
            if (isCorrect) strengths.push('Fluid Resuscitation')
            else {
              weakAreas.push('Volume Expansion')
              recommendedModules.push('NALS Module 6: Volume Expansion')
            }
          }
          if (text.includes('breath') || text.includes('ppv')) {
            if (isCorrect) strengths.push('Positive Pressure Ventilation')
            else {
              weakAreas.push('Positive Pressure Ventilation')
              recommendedModules.push('NALS Module 3: Positive Pressure Ventilation')
            }
          }
        } else if (course.id === 'c3' || course.name.toLowerCase().includes('pediatric') || course.name.toLowerCase().includes('pals')) {
          if (text.includes('pat') || text.includes('ticls')) {
            if (isCorrect) strengths.push('Pediatric Assessment Triangle')
            else {
              weakAreas.push('Doorway Look & PAT')
              recommendedModules.push('PALS Module 1: Doorway Look and PAT')
            }
          }
          if (text.includes('respiratory') || text.includes('spo2')) {
            if (isCorrect) strengths.push('Oxygenation Assessment')
            else {
              weakAreas.push('Breathing Distress vs Failure')
              recommendedModules.push('PALS Module 2: Breathing Distress vs Failure')
            }
          }
          if (text.includes('shock') || text.includes('pulse') || text.includes('crt') || text.includes('bp')) {
            if (isCorrect) strengths.push('Hemodynamic Assessment')
            else {
              weakAreas.push('Shock Recognition & Management')
              recommendedModules.push('PALS Module 3: Shock Recognition and Management')
            }
          }
          if (text.includes('cpr') || text.includes('compression')) {
            if (isCorrect) strengths.push('Pediatric CPR Techniques')
            else {
              weakAreas.push('High-Quality Pediatric CPR')
              recommendedModules.push('PALS Module 4: High-Quality Pediatric CPR')
            }
          }
          if (text.includes('glucose') || text.includes('avpu')) {
            if (isCorrect) strengths.push('Neurological Assessment')
            else {
              weakAreas.push('Disability Assessment')
              recommendedModules.push('PALS Module 5: Disability Assessment')
            }
          }
        }
      })
    }

    if (weakAreas.length === 0) {
      if (score < 85) {
        weakAreas.push('Core Protocol Memorization')
        recommendedModules.push(`${course.name} Module 1: Foundational Review`)
      }
    }
    if (strengths.length === 0) {
      if (score >= 70) {
        strengths.push('General Concepts')
      } else {
        strengths.push('Attendance and Basic Participation')
      }
    }

    const uniqueWeakAreas = [...new Set(weakAreas)]
    const uniqueStrengths = [...new Set(strengths)]
    const uniqueRecommendedModules = [...new Set(recommendedModules)]

    let weakText = uniqueWeakAreas.length > 0 ? `needs revision in ${uniqueWeakAreas.join(' and ')}` : 'shows no immediate weak areas'
    let facultyFeedback = `${learner.name} demonstrates good foundational knowledge but ${weakText}. Recommend reviewing ${uniqueRecommendedModules.length > 0 ? uniqueRecommendedModules.join(' and ') : 'the core modules'} before attempting the final post-test.`

    const actionPlan = [
      `Review recommended module material: ${uniqueRecommendedModules.length > 0 ? uniqueRecommendedModules[0] : course.name + ' Core Modules'}.`,
      `Attempt practice questions focused on: ${uniqueWeakAreas.length > 0 ? uniqueWeakAreas[0] : 'General clinical algorithms'}.`,
      `Schedule a brief 1-on-1 OSCE review with faculty advisor.`
    ]

    res.json({
      learnerName: learner.name,
      courseName: course.name,
      overallStatus,
      averageScore: score,
      weakAreas: uniqueWeakAreas,
      strengths: uniqueStrengths,
      recommendedModules: uniqueRecommendedModules,
      facultyFeedback,
      actionPlan
    })
  } catch (error) {
    console.error('AI feedback generate error:', error)
    res.status(500).json({ message: 'Server error generating AI feedback' })
  }
})

// GET /api/faculty/learner/:id
router.get('/learner/:id', protect, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id }).select('-password').lean()
    const enrollments = await Enrollment.find({ learnerId: req.params.id }).lean()
    const certificates = await Certificate.find({ learnerId: req.params.id }).lean()
    res.json({ user, enrollments, certificates })
  } catch (error) {
    console.error('Fetch learner detail error:', error)
    res.status(500).json({ message: 'Server error loading learner details' })
  }
})

// POST /api/faculty/feedback/send - Save AI feedback and notify learner
router.post('/feedback/send', protect, async (req, res) => {
  try {
    const { learnerId, courseId, feedback } = req.body
    const facultyId = req.user.id

    if (!learnerId || !courseId || !feedback) {
      return res.status(400).json({ message: 'learnerId, courseId, and feedback are required' })
    }

    // Save to DB
    const aiFeedback = await AIFeedback.create({
      learnerId,
      facultyId,
      courseId,
      feedback,
      createdAt: new Date().toISOString()
    })

    // Create a notification for the learner
    const course = await Course.findOne({ id: courseId }).lean()
    const courseName = course ? course.name : 'Clinical Course'

    await Notification.create({
      id: 'n_ai_feedback_' + Date.now(),
      learnerId,
      type: 'test_result',
      message: `AI-Generated Performance Analysis feedback is available for ${courseName}. Click here to review.`,
      link: `/learner/course/${courseId}`,
      read: false,
      createdAt: new Date().toISOString()
    })

    res.status(201).json({ success: true, aiFeedback })
  } catch (error) {
    console.error('Send AI feedback error:', error)
    res.status(500).json({ message: 'Server error saving AI feedback' })
  }
})

export default router
