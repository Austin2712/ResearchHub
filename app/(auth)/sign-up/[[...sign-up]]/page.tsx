// app/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Join ResearchHub</h1>
        <p className="mt-2 text-gray-600">Start your research journey today</p>
      </div>
      
      <SignUp 
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
        Already have an account?{' '}
        <Link href="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium">
          Sign in here
        </Link>
      </p>
    </div>
  )
}