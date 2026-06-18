import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import LearnerLayout from '@/components/layouts/LearnerLayout'
import FacultyLayout from '@/components/layouts/FacultyLayout'
import AdminLayout   from '@/components/layouts/AdminLayout'

// Auth
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))

// Learner
const LearnerDashboard  = lazy(() => import('@/pages/learner/Dashboard'))
const CourseView        = lazy(() => import('@/pages/learner/CourseView'))
const AssessmentPage    = lazy(() => import('@/pages/learner/AssessmentPage'))
const OSCEView          = lazy(() => import('@/pages/learner/OSCEView'))
const Certificates      = lazy(() => import('@/pages/learner/Certificates'))
const LearnerProfile    = lazy(() => import('@/pages/learner/Profile'))

// Faculty
const FacultyDashboard  = lazy(() => import('@/pages/faculty/Dashboard'))
const LearnerMonitor    = lazy(() => import('@/pages/faculty/LearnerMonitor'))
const OSCEEvaluation    = lazy(() => import('@/pages/faculty/OSCEEvaluation'))
const AssessmentReview  = lazy(() => import('@/pages/faculty/AssessmentReview'))
const FeedbackGenerator = lazy(() => import('@/pages/faculty/FeedbackGenerator'))

// Admin
const AdminDashboard      = lazy(() => import('@/pages/admin/Dashboard'))
const CourseBuilder       = lazy(() => import('@/pages/admin/CourseBuilder'))
const BatchManagement     = lazy(() => import('@/pages/admin/BatchManagement'))
const SimulationScheduler = lazy(() => import('@/pages/admin/SimulationScheduler'))
const UserManagement      = lazy(() => import('@/pages/admin/UserManagement'))
const Reports             = lazy(() => import('@/pages/admin/Reports'))

const Fallback = () => (
  <div className="flex items-center justify-center h-64">
    <LoadingSpinner size="lg" />
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Fallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  // ── Learner Portal ──────────────────────────────────────
  {
    path: '/learner',
    element: (
      <PrivateRoute allowedRoles={['learner']}>
        <LearnerLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Suspense fallback={<Fallback />}><LearnerDashboard /></Suspense> },
      { path: 'course/:id',      element: <Suspense fallback={<Fallback />}><CourseView /></Suspense> },
      { path: 'assessment/:id',  element: <Suspense fallback={<Fallback />}><AssessmentPage /></Suspense> },
      { path: 'osce/:sessionId/:learnerId', element: <Suspense fallback={<Fallback />}><OSCEView /></Suspense> },
      { path: 'certificates',    element: <Suspense fallback={<Fallback />}><Certificates /></Suspense> },
      { path: 'profile',         element: <Suspense fallback={<Fallback />}><LearnerProfile /></Suspense> },
    ],
  },
  // ── Faculty Portal ──────────────────────────────────────
  {
    path: '/faculty',
    element: (
      <PrivateRoute allowedRoles={['faculty']}>
        <FacultyLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Suspense fallback={<Fallback />}><FacultyDashboard /></Suspense> },
      { path: 'batch/:id',       element: <Suspense fallback={<Fallback />}><LearnerMonitor /></Suspense> },
      { path: 'osce/:sessionId/:learnerId', element: <Suspense fallback={<Fallback />}><OSCEEvaluation /></Suspense> },
      { path: 'assessments',     element: <Suspense fallback={<Fallback />}><AssessmentReview /></Suspense> },
      { path: 'feedback/:learnerId', element: <Suspense fallback={<Fallback />}><FeedbackGenerator /></Suspense> },
    ],
  },
  // ── Admin Portal ────────────────────────────────────────
  {
    path: '/admin',
    element: (
      <PrivateRoute allowedRoles={['admin']}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Suspense fallback={<Fallback />}><AdminDashboard /></Suspense> },
      { path: 'courses',         element: <Suspense fallback={<Fallback />}><CourseBuilder /></Suspense> },
      { path: 'batches',         element: <Suspense fallback={<Fallback />}><BatchManagement /></Suspense> },
      { path: 'simulations',     element: <Suspense fallback={<Fallback />}><SimulationScheduler /></Suspense> },
      { path: 'users',           element: <Suspense fallback={<Fallback />}><UserManagement /></Suspense> },
      { path: 'reports',         element: <Suspense fallback={<Fallback />}><Reports /></Suspense> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])
