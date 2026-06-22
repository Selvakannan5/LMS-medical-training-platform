import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema({
  id: String,
  title: String,
  type: { type: String, enum: ['video', 'pdf', 'interactive', 'reading'], default: 'pdf' },
  duration: String,
  completed: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
  contentUrl: String,
  learningObjectives: String,
  studyContent: String,
  clinicalScenario: String,
  algorithm: String,
  commonMistakes: String,
  safetyTips: String,
  keyPoints: [String],
  summary: String,
  importantNotes: String
}, { _id: false })

const courseSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  programId: String,
  name: String,
  description: String,
  modules: [moduleSchema],
  progress: { type: Number, default: 0 },
  preTestId: String,
  postTestId: String
}, { timestamps: true })

export default mongoose.model('Course', courseSchema)
