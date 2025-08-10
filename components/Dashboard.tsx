'use client'
// import MainLayout from '@/components/MainLayout'
import { 
  FileText, Calendar, Users, Sparkles, TrendingUp, 
  Clock, Target, Award, ArrowUpRight, MoreHorizontal
} from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      name: 'Active Projects',
      value: '8',
      change: '+2 this month',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Upcoming Deadlines',
      value: '3',
      change: '2 days left',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      name: 'Collaborators',
      value: '12',
      change: '+3 new',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      name: 'AI Suggestions',
      value: '47',
      change: 'This week',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ]

  const projects = [
    {
      id: 1,
      title: 'AI in Healthcare: Predictive Analytics',
      description: 'Machine learning models for early disease detection',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-02-15',
      collaborators: 3,
      aiTips: 8,
      statusColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 2,
      title: 'Climate Change Impact Analysis',
      description: 'Statistical analysis of temperature patterns',
      status: 'Draft',
      progress: 40,
      dueDate: '2024-03-01',
      collaborators: 2,
      aiTips: 12,
      statusColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      id: 3,
      title: 'Quantum Computing Survey',
      description: 'Comprehensive review of quantum algorithms',
      status: 'Review',
      progress: 90,
      dueDate: '2024-01-30',
      collaborators: 3,
      aiTips: 5,
      statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      id: 4,
      title: 'Social Media Sentiment Analysis',
      description: 'NLP techniques for emotion detection',
      status: 'Planning',
      progress: 25,
      dueDate: '2024-04-15',
      collaborators: 2,
      aiTips: 15,
      statusColor: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      borderColor: 'border-gray-200 dark:border-gray-700'
    }
  ]

  return (

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Research Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Here's your research overview.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Target className="w-4 h-4" />
              Find Conferences
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <FileText className="w-4 h-4" />
              New Project
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.name}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.change}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Active Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Projects</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: 2 hours ago</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 ${project.borderColor} p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {project.description}
                    </p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.collaborators}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {project.aiTips} AI tips
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs">Due: {project.dueDate}</span>
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                      Open Editor
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}