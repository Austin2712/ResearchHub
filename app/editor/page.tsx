'use client'

import { useUser } from '@clerk/nextjs'
import { SignIn } from '@clerk/nextjs'
import Navigation from '@/components/Navigation'
import TiptapDocumentEditor from '@/components/TiptapDocumentEditor'

export default function EditorPage() {
  const { user, isLoaded } = useUser()

  // Show loading while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading ResearchHub...</span>
        </div>
      </div>
    )
  }

  // Show sign in if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Show Navigation even for unauthenticated users */}
        <Navigation />
        
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="max-w-md w-full mx-4">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to ResearchHub Editor
              </h1>
              <p className="text-gray-600">
                Sign in to start writing and collaborating on your research papers
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-1">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-none border-0",
                    headerTitle: "text-xl font-semibold",
                    headerSubtitle: "text-gray-600",
                    socialButtonsBlockButton: "hover:bg-gray-50 transition-colors",
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 transition-colors",
                    footerActionLink: "text-blue-600 hover:text-blue-700"
                  }
                }}
                redirectUrl="/editor"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show the full editor interface for authenticated users
  return (
    <div className="h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navigation />
      
      {/* Editor Content - Full height minus navbar with no gap */}
      <div className="h-[calc(100vh-64px)]">
        <TiptapDocumentEditor />
      </div>
    </div>
  )
}