import express from 'express'
import OSCEEvaluation from '../models/OSCEEvaluation.js'
import { protect } from '../middleware.js'

const router = express.Router()

// GET /api/osce/:sessionId/:learnerId
router.get('/:sessionId/:learnerId', protect, async (req, res) => {
  try {
    const { learnerId } = req.params
    // Find the latest OSCE evaluation for this learner
    const evaluation = await OSCEEvaluation.findOne({ learnerId }).sort({ createdAt: -1 }).lean()

    if (!evaluation) {
      return res.status(404).json({ message: 'OSCE evaluation not found' })
    }

    const steps = evaluation.checklistScores.map((scoreObj, idx) => ({
      id: `step${idx + 1}`,
      description: scoreObj.item,
      result: scoreObj.score === 1 ? 'pass' : 'fail',
      notes: ''
    }))

    res.json({
      submittedAt: evaluation.createdAt,
      overallResult: evaluation.status,
      communicationScore: evaluation.communicationScore,
      technicalScore: evaluation.technicalScore,
      decisionMakingScore: evaluation.decisionMakingScore,
      safetyScore: evaluation.safetyScore,
      comments: evaluation.comments,
      steps
    })
  } catch (error) {
    console.error('Fetch OSCE result error:', error)
    res.status(500).json({ message: 'Server error loading OSCE results' })
  }
})

export default router
