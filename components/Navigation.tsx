'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Home, FileText, Users, Calendar, Brain, BarChart3, Menu, X, Bell, Search, BookOpen, Layout } from 'lucide-react'
import Button from './ui/Button'

// Optional auth hook - won't crash if AuthContext is not available
function useOptionalAuth() {
  try {
    const { useAuth } = require('@/contexts/AuthContext')
    return useAuth()
  } catch (error) {
    // Return default values if AuthContext is not available
    return {
      user: null,
      signOut: () => console.log('Sign out clicked')
    }
  }
}

interface NavigationProps {
  currentPage?: string
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useOptionalAuth()

  const navItems = [
    { name: 'Dashboard', href: '/', icon: Home, key: 'dashboard' },
    { name: 'Editor', href: '/editor', icon: FileText, key: 'editor' },
    { name: 'Templates', href: '/templates', icon: Layout, key: 'templates' },
    { name: 'Conferences', href: '/conferences', icon: Calendar, key: 'conferences' },
    { name: 'AI Research', href: '/ai-research', icon: Brain, key: 'ai-research' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, key: 'analytics' },
    { name: 'References', href: '/references', icon: BookOpen, key: 'references' },
    { name: 'Collaboration', href: '/collaboration', icon: Users, key: 'collaboration' }
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">ResearchHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.key
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.email?.charAt(0).toUpperCase() || 'JD'}
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.key
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}