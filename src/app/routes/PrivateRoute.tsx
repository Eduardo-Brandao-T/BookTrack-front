import { Navigate } from 'react-router-dom'
import { useAuth } from '@/app/hooks/useAuth'
import type { ReactNode } from 'react'

interface PrivateRouteProps {
  children: ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth()

  if (loading) return <div>Carregando...</div>
  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}
