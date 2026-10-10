// Replace your current sign-in page with this:
// app/sign-in/page.tsx OR wherever your current sign-in page is

import { SignIn } from '@clerk/nextjs'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Simple header with just logo - NO NAVIGATION */}
      <div className="flex justify-center pt-8 pb-4">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">ResearchHub</span>
        </Link>
      </div>
      
      {/* Main content area */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="mt-2 text-gray-600">Sign in to your ResearchHub account</p>
            </div>
            
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
                  card: 'shadow-xl',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                }
              }}
              redirectUrl="/dashboard"
            />
            
            <p className="text-center text-sm text-gray-500">
              New to ResearchHub?{' '}
              <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}