'use client'
import { useAuth } from '@/contexts/AuthContext'
import Auth from '@/components/Auth'
import Navigation from '@/components/Navigation'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <Auth />
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="dashboard" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard />
      </div>
    </div>
  )
}