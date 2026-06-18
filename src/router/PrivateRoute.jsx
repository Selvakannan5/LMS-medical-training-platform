import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export function PrivateRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect to their proper portal
    const redirectMap = { learner: '/learner', faculty: '/faculty', admin: '/admin' }
    return <Navigate to={redirectMap[user?.role] || '/login'} replace />
  }

  return children
}
