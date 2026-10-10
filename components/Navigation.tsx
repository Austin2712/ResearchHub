'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import { Home, FileText, Users, Brain, BarChart3, Menu, X, Bell, Search, BookOpen, Layout } from 'lucide-react'
import Button from './ui/Button'

interface NavigationProps {
  currentPage?: string
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { isSignedIn, user } = useUser()
  const searchRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { name: 'Dashboard', href: '/', icon: Home, key: 'dashboard' },
    { name: 'Editor', href: '/editor', icon: FileText, key: 'editor' },
    { name: 'Templates', href: '/templates', icon: Layout, key: 'templates' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, key: 'analytics' },
    { name: 'References', href: '/references', icon: BookOpen, key: 'references' },
    { name: 'Collaboration', href: '/collaboration', icon: Users, key: 'collaboration' },
    { name: 'AI Assistant', href: '/ai-research', icon: Brain, key: 'ai-research' }
  ]

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Get user display name with proper fallback
  const getUserDisplayName = () => {
    if (!user) return ''
    
    if (user.firstName) {
      return user.firstName
    }
    
    const email = user.emailAddresses?.[0]?.emailAddress
    if (email) {
      return email.split('@')[0] // Show only username part of email
    }
    
    return 'User'
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex-shrink-0 flex items-center mr-4 lg:mr-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">
                  ResearchHub
                </span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:space-x-1 xl:space-x-3 flex-1 min-w-0 overflow-hidden">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.key
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-0.5 lg:px-1 border-b-2 font-medium text-sm flex items-center space-x-1 transition-colors`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden xl:block">{item.name}</span>
                    <span className="lg:block xl:hidden text-xs" title={item.name}>
                      {item.name.split(' ')[0]}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side - Search, notifications, and user menu */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0 ml-2">
            {/* Search Dropdown */}
            <div className="relative hidden sm:block" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search projects, references, templates..."
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      autoFocus
                    />
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Press <kbd className="px-1 py-0.5 bg-gray-100 rounded">Enter</kbd> to search
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            {isSignedIn && (
              <button className="bg-white p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Bell className="h-5 w-5" />
              </button>
            )}

            {/* Authentication */}
            {isSignedIn ? (
              <div className="flex items-center space-x-2 min-w-0">
                <span className="text-sm text-gray-700 hidden lg:block truncate max-w-[120px]">
                  Hi, {getUserDisplayName()}
                </span>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 sm:w-10 sm:h-10"
                    }
                  }}
                />
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            )}
          </div>

          {/* Mobile menu button and mobile auth */}
          <div className="sm:hidden flex items-center space-x-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
            </button>

            {isSignedIn ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isSearchOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden lg:hidden border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1 bg-white">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.key
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  } block pl-3 pr-4 py-3 border-l-4 text-base font-medium flex items-center space-x-3 transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
          
          {/* Mobile user greeting */}
          {isSignedIn && (
            <div className="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
              <div className="px-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10"
                        }
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium text-gray-800 truncate">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.emailAddresses?.[0]?.emailAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}