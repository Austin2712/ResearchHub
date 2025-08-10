'use client'
import { useAuth } from '@/contexts/AuthContext'
import Auth from '@/components/Auth'
import AIResearchAssistant from '@/components/AIResearchAssistant'

export default function AIAssistantPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI Research Assistant...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return <AIResearchAssistant />
}