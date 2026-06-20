import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from './config/db.js'
import User from './models/User.js'
import Program from './models/Program.js'
import Course from './models/Course.js'
import Assessment from './models/Assessment.js'
import Enrollment from './models/Enrollment.js'
import ModuleQuiz from './models/ModuleQuiz.js'
import ModuleQuizResult from './models/ModuleQuizResult.js'
import CourseProgress from './models/CourseProgress.js'
import UserProgress from './models/UserProgress.js'
import Result from './models/Results.js'
import OSCEEvaluation from './models/OSCEEvaluation.js'
import { Certificate, Batch, Simulation, Notification } from './models/SimpleModels.js'
import { programs, courses, assessments, generateQuizzes } from './seedData.js'

const password = await bcrypt.hash('MedTrain@123', 10)

const users = [
  { 
    id: 'u1', 
    name: 'Ronaldo', 
    email: 'learner@demo.com', 
    password, 
    role: 'learner', 
    phoneNumber: '9876543210', 
    hospital: 'Apollo Hospitals', 
    department: 'Emergency Medicine' 
  },
  { 
    id: 'u2', 
    name: 'Lionel Messi', 
    email: 'learner2@demo.com', 
    password, 
    role: 'learner', 
    phoneNumber: '9876543213', 
    hospital: 'Apollo Hospitals', 
    department: 'ICU' 
  },
  { 
    id: 'u3', 
    name: 'Neymar Jr', 
    email: 'learner3@demo.com', 
    password, 
    role: 'learner', 
    phoneNumber: '9876543214', 
    hospital: 'Apollo Hospitals', 
    department: 'Pediatrics' 
  },
  { 
    id: 'f1', 
    name: 'Dr. Suresh Kumar', 
    email: 'faculty@demo.com', 
    password, 
    role: 'faculty', 
    phoneNumber: '9876543211', 
    hospital: 'Apollo Hospitals', 
    department: 'Pediatrics' 
  },
  { 
    id: 'admin1', 
    name: 'Admin User', 
    email: 'admin@demo.com', 
    password, 
    role: 'admin', 
    phoneNumber: '9876543212', 
    hospital: 'Admin HQ', 
    department: 'Training Admin' 
  }
]

const quizzes = generateQuizzes()

const enrollments = [
  // Ronaldo
  { id: 'e_c1_u1', learnerId: 'u1', courseId: 'c1', progress: 85, status: 'in_progress', enrolledAt: new Date().toISOString() },
  { id: 'e_c2_u1', learnerId: 'u1', courseId: 'c2', progress: 40, status: 'in_progress', enrolledAt: new Date().toISOString() },
  { id: 'e_c4_u1', learnerId: 'u1', courseId: 'c4', progress: 50, status: 'in_progress', enrolledAt: new Date().toISOString() },
  // Messi
  { id: 'e_c1_u2', learnerId: 'u2', courseId: 'c1', progress: 95, status: 'in_progress', enrolledAt: new Date().toISOString() },
  { id: 'e_c2_u2', learnerId: 'u2', courseId: 'c2', progress: 20, status: 'in_progress', enrolledAt: new Date().toISOString() },
  // Neymar
  { id: 'e_c3_u3', learnerId: 'u3', courseId: 'c3', progress: 30, status: 'in_progress', enrolledAt: new Date().toISOString() },
  { id: 'e_c5_u3', learnerId: 'u3', courseId: 'c5', progress: 10, status: 'in_progress', enrolledAt: new Date().toISOString() }
]

const courseProgresses = [
  // Ronaldo
  { id: 'cp_c1_u1', learnerId: 'u1', courseId: 'c1', progress: 85, preTestPassed: true, postTestPassed: false, completedModules: ['bls-m1', 'bls-m2'], unlockedModules: ['bls-m1', 'bls-m2', 'bls-m3'], status: 'in_progress' },
  { id: 'cp_c2_u1', learnerId: 'u1', courseId: 'c2', progress: 40, preTestPassed: true, postTestPassed: false, completedModules: ['acls-m1'], unlockedModules: ['acls-m1', 'acls-m2'], status: 'in_progress' },
  { id: 'cp_c4_u1', learnerId: 'u1', courseId: 'c4', progress: 50, preTestPassed: true, postTestPassed: false, completedModules: ['nals-m1'], unlockedModules: ['nals-m1', 'nals-m2'], status: 'in_progress' },
  // Messi
  { id: 'cp_c1_u2', learnerId: 'u2', courseId: 'c1', progress: 95, preTestPassed: true, postTestPassed: false, completedModules: ['bls-m1', 'bls-m2', 'bls-m3'], unlockedModules: ['bls-m1', 'bls-m2', 'bls-m3', 'bls-m4'], status: 'in_progress' },
  { id: 'cp_c2_u2', learnerId: 'u2', courseId: 'c2', progress: 20, preTestPassed: true, postTestPassed: false, completedModules: [], unlockedModules: ['acls-m1'], status: 'not_started' },
  // Neymar
  { id: 'cp_c3_u3', learnerId: 'u3', courseId: 'c3', progress: 30, preTestPassed: true, postTestPassed: false, completedModules: [], unlockedModules: ['pals-m1'], status: 'not_started' },
  { id: 'cp_c5_u3', learnerId: 'u3', courseId: 'c5', progress: 10, preTestPassed: true, postTestPassed: false, completedModules: [], unlockedModules: ['atls-m1'], status: 'not_started' }
]

const results = [
  // Ronaldo
  {
    learnerId: 'u1',
    assessmentId: 'c1-posttest',
    courseId: 'c1',
    score: 85,
    correct: 17,
    total: 20,
    passed: true,
    answers: {},
    review: [
      { questionText: "AED pad placement rules", isCorrect: true },
      { questionText: "Compression depth in adults", isCorrect: true },
      { questionText: "Breathing checks sequence", isCorrect: false }
    ]
  },
  {
    learnerId: 'u1',
    assessmentId: 'c4-posttest',
    courseId: 'c4',
    score: 55,
    correct: 11,
    total: 20,
    passed: false,
    answers: {},
    review: [
      { questionText: "What is the first step of MRSOPA chest rise correction?", isCorrect: false },
      { questionText: "When should chest compressions be started in neonatal resuscitation?", isCorrect: false },
      { questionText: "What is the recommended dose of epinephrine?", isCorrect: true }
    ]
  },
  // Messi
  {
    learnerId: 'u2',
    assessmentId: 'c1-posttest',
    courseId: 'c1',
    score: 95,
    correct: 19,
    total: 20,
    passed: true,
    answers: {},
    review: [
      { questionText: "AED pad placement rules", isCorrect: true },
      { questionText: "Compression depth in adults", isCorrect: true }
    ]
  },
  // Neymar
  {
    learnerId: 'u3',
    assessmentId: 'c3-posttest',
    courseId: 'c3',
    score: 45,
    correct: 9,
    total: 20,
    passed: false,
    answers: {},
    review: [
      { questionText: "What are the components of the PAT triangle?", isCorrect: false },
      { questionText: "How do you identify signs of septic shock in pediatric patient?", isCorrect: false }
    ]
  }
]

const osceEvaluations = [
  {
    learnerId: 'u1',
    facultyId: 'f1',
    courseId: 'c1',
    scenario: 'Adult Cardiac Arrest BLS Scenario',
    checklistScores: [
      { item: 'Scene safety assessment', score: 1 },
      { item: 'Check responsiveness', score: 1 },
      { item: 'Call for help / activate EMS', score: 1 }
    ],
    communicationScore: 8,
    technicalScore: 8,
    decisionMakingScore: 8,
    safetyScore: 9,
    finalScore: 8.3,
    status: 'pass',
    comments: 'Excellent CPR posture and compression rhythm. Good leadership skills during resuscitation.'
  }
]

const certificates = []
const batches = [
  { 
    id: 'b1', 
    name: 'Emergency Care Demo Batch', 
    programId: 'p3', 
    startDate: '2026-06-19', 
    endDate: '2026-07-05', 
    maxSeats: 20, 
    enrolledCount: 3, 
    faculty: ['f1'], 
    status: 'active', 
    learners: ['u1', 'u2', 'u3'] 
  }
]

const simulations = [
  { id: 's1', scenario: 'Pediatric Respiratory Failure', batchId: 'b1', date: '2026-06-25', time: '10:00', room: 'Sim Lab A', faculty: 'f1', status: 'scheduled' },
  { id: 's2', scenario: 'Neonatal Resuscitation Training', batchId: 'b1', date: '2026-06-28', time: '14:00', room: 'Sim Lab B', faculty: 'f1', status: 'scheduled' }
]

const notifications = [
  { id: 'n1', type: 'course', message: 'All 6 life support training programs are now live.', read: false, createdAt: new Date().toISOString() }
]

try {
  await connectDB()
  
  await Promise.all([
    User.deleteMany(),
    Program.deleteMany(),
    Course.deleteMany(),
    Assessment.deleteMany(),
    Enrollment.deleteMany(),
    Certificate.deleteMany(),
    Batch.deleteMany(),
    Simulation.deleteMany(),
    Notification.deleteMany(),
    ModuleQuiz.deleteMany(),
    ModuleQuizResult.deleteMany(),
    CourseProgress.deleteMany(),
    UserProgress.deleteMany(),
    Result.deleteMany(),
    OSCEEvaluation.deleteMany()
  ])

  await User.insertMany(users)
  await Program.insertMany(programs)
  await Course.insertMany(courses)
  await Assessment.insertMany(assessments)
  await Enrollment.insertMany(enrollments)
  await CourseProgress.insertMany(courseProgresses)
  await ModuleQuiz.insertMany(quizzes)
  await Result.insertMany(results)
  await OSCEEvaluation.insertMany(osceEvaluations)
  await Certificate.insertMany(certificates)
  await Batch.insertMany(batches)
  await Simulation.insertMany(simulations)
  await Notification.insertMany(notifications)

  console.log('Database seeded successfully with all 6 life support programs, quizzes, assessments, and sample results/evaluations.')
  console.log('Login: learner@demo.com / MedTrain@123')
  console.log('Login: faculty@demo.com / MedTrain@123')
  process.exit(0)
} catch (error) {
  console.error('Seeding error:', error)
  process.exit(1)
}
