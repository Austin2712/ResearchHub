'use client'
import { useUser, SignInButton } from '@clerk/nextjs'
import Navigation from '@/components/Navigation'
import Dashboard from '@/components/Dashboard'
import { ArrowRight, BookOpen, Brain, BarChart3, Users, Zap, Globe, CheckCircle, Star, Play, FileText, Search } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser()

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading ResearchHub...</p>
        </div>
      </div>
    )
  }

  // If user is signed in, show the dashboard
  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation currentPage="dashboard" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Dashboard />
        </div>
      </div>
    )
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-white">
      {/* Top navigation bar */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and title */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ResearchHub</span>
          </div>
          
          {/* Sign In Button */}
          <SignInButton mode="modal">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Research Platform
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Research Made
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Intelligent</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your complete research intelligence platform. Write, analyze, collaborate, and publish with the power of AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <SignInButton mode="modal">
                <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SignInButton>
              
              <button className="flex items-center px-8 py-4 text-lg text-gray-700 hover:text-gray-900 transition-colors">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="ml-1 text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5" />
                <span className="ml-1 text-sm">10K+ Researchers</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5" />
                <span className="ml-1 text-sm">50+ Universities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for Research
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From ideation to publication, ResearchHub provides all the tools you need in one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Writing Assistant",
                description: "Advanced AI helps you write, edit, and improve your research papers with intelligent suggestions.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: BarChart3,
                title: "Research Analytics",
                description: "Track citations, impact metrics, and research trends with comprehensive analytics dashboard.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: BookOpen,
                title: "Reference Manager",
                description: "Smart citation management with automatic formatting for all major academic styles.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Real-time collaboration tools for seamless teamwork on research projects.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: FileText,
                title: "Template Library",
                description: "Professional templates for all types of research papers and academic documents.",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: Search,
                title: "Smart Search",
                description: "Intelligent search across millions of academic papers and research databases.",
                color: "from-teal-500 to-green-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Active Researchers" },
              { number: "50,000+", label: "Papers Published" },
              { number: "500+", label: "Universities" },
              { number: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Researchers Worldwide</h2>
            <p className="text-xl text-gray-600">See what researchers are saying about ResearchHub</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "ResearchHub has revolutionized how I conduct research. The AI writing assistant is incredible!",
                author: "Dr. Sarah Chen",
                role: "Professor of Biology, MIT",
                avatar: "SC"
              },
              {
                quote: "The collaboration features make working with my research team seamless and efficient.",
                author: "Prof. Michael Johnson",
                role: "Head of Psychology, Stanford",
                avatar: "MJ"
              },
              {
                quote: "Best research platform I've used. The analytics dashboard provides invaluable insights.",
                author: "Dr. Emma Williams",
                role: "Research Scientist, Harvard",
                avatar: "EW"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Research?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of researchers who are already using ResearchHub to accelerate their work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignInButton mode="modal">
              <Button size="lg" className="px-8 py-4 text-lg bg-white text-blue-900 hover:bg-gray-100">
                Start Free Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </SignInButton>
            
            <div className="flex items-center text-blue-100">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-5 rounded-full"></div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ResearchHub</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering researchers worldwide with AI-driven tools for intelligent research and collaboration.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">𝕏</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ResearchHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}