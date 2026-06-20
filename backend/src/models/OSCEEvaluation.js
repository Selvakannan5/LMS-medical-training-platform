import mongoose from 'mongoose'

const osceEvaluationSchema = new mongoose.Schema(
  {
    learnerId: {
      type: String,
      required: true,
    },
    facultyId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    scenario: {
      type: String,
      required: true,
    },
    checklistScores: [
      {
        item: String,
        score: Number,
      }
    ],
    communicationScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    technicalScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    decisionMakingScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    safetyScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    finalScore: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['pass', 'fail'],
    },
    comments: {
      type: String,
    }
  },
  { timestamps: true }
)

export default mongoose.model('OSCEEvaluation', osceEvaluationSchema)
