'use client'
import { useState } from 'react'
import { BarChart3, TrendingUp, Users, Target, Calendar, Award, BookOpen, Zap, Eye, Download, Filter, Search } from 'lucide-react'
import Button from './ui/Button'

interface MetricCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: any
  color: string
}

interface Publication {
  id: string
  title: string
  journal: string
  year: number
  citations: number
  hIndex: number
  impact: 'high' | 'medium' | 'low'
  status: 'published' | 'under-review' | 'draft'
}

interface Collaboration {
  id: string
  name: string
  institution: string
  papers: number
  citations: number
  strength: number
  avatar: string
}

export default function ResearchAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('12months')
  const [activeTab, setActiveTab] = useState('overview')

  const metrics: MetricCard[] = [
    {
      title: 'Total Citations',
      value: '1,247',
      change: '+23%',
      trend: 'up',
      icon: Award,
      color: 'bg-blue-500'
    },
    {
      title: 'H-Index',
      value: '18',
      change: '+2',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Publications',
      value: '34',
      change: '+5',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      title: 'Collaborations',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      title: 'Research Score',
      value: '8.7/10',
      change: '+0.3',
      trend: 'up',
      icon: Target,
      color: 'bg-red-500'
    },
    {
      title: 'Impact Factor',
      value: '4.23',
      change: '+0.15',
      trend: 'up',
      icon: Zap,
      color: 'bg-indigo-500'
    }
  ]

  const publications: Publication[] = [
    {
      id: '1',
      title: 'Deep Learning Approaches for Natural Language Processing',
      journal: 'Nature Machine Intelligence',
      year: 2024,
      citations: 187,
      hIndex: 12,
      impact: 'high',
      status: 'published'
    },
    {
      id: '2',
      title: 'Quantum Computing Applications in Cryptography',
      journal: 'IEEE Transactions on Quantum Engineering',
      year: 2023,
      citations: 143,
      hIndex: 9,
      impact: 'high',
      status: 'published'
    },
    {
      id: '3',
      title: 'Machine Learning for Climate Change Prediction',
      journal: 'Science',
      year: 2023,
      citations: 298,
      hIndex: 15,
      impact: 'high',
      status: 'published'
    },
    {
      id: '4',
      title: 'Blockchain Technology in Healthcare Systems',
      journal: 'Journal of Medical Internet Research',
      year: 2024,
      citations: 76,
      hIndex: 6,
      impact: 'medium',
      status: 'under-review'
    },
    {
      id: '5',
      title: 'AI Ethics in Autonomous Vehicle Decision Making',
      journal: 'AI Ethics Journal',
      year: 2024,
      citations: 45,
      hIndex: 4,
      impact: 'medium',
      status: 'draft'
    }
  ]

  const collaborations: Collaboration[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      institution: 'MIT',
      papers: 8,
      citations: 432,
      strength: 95,
      avatar: 'SC'
    },
    {
      id: '2',
      name: 'Prof. Michael Rodriguez',
      institution: 'Stanford University',
      papers: 6,
      citations: 287,
      strength: 87,
      avatar: 'MR'
    },
    {
      id: '3',
      name: 'Dr. Emily Johnson',
      institution: 'Oxford University',
      papers: 4,
      citations: 198,
      strength: 76,
      avatar: 'EJ'
    },
    {
      id: '4',
      name: 'Prof. David Kim',
      institution: 'Tokyo University',
      papers: 5,
      citations: 234,
      strength: 82,
      avatar: 'DK'
    }
  ]

  const trendingTopics = [
    { topic: 'Quantum Machine Learning', growth: '+145%', papers: 2847 },
    { topic: 'Explainable AI', growth: '+89%', papers: 1932 },
    { topic: 'Federated Learning', growth: '+112%', papers: 1456 },
    { topic: 'Neural Architecture Search', growth: '+67%', papers: 987 },
    { topic: 'Green AI', growth: '+134%', papers: 743 }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'under-review': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Analytics</h1>
            <p className="text-gray-600">Track your research impact, collaborations, and trending opportunities</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="all">All Time</option>
            </select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'publications', name: 'Publications', icon: BookOpen },
              { id: 'collaborations', name: 'Collaborations', icon: Users },
              { id: 'trends', name: 'Trending Topics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Citation Growth Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Citation Growth</h3>
              <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg flex items-end justify-center p-4">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-sm text-gray-600">Citation graph visualization</p>
                  <p className="text-xs text-gray-500 mt-2">Growing at 23% annually</p>
                </div>
              </div>
            </div>

            {/* Research Impact */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Citation Velocity</span>
                  <span className="text-sm font-medium text-green-600">+45 this month</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Journal Impact</span>
                  <span className="text-sm font-medium text-blue-600">Q1 Average</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Research Visibility</span>
                  <span className="text-sm font-medium text-purple-600">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Publications</h3>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search publications..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-medium text-gray-700">Publication</th>
                    <th className="text-left p-4 font-medium text-gray-700">Journal</th>
                    <th className="text-left p-4 font-medium text-gray-700">Year</th>
                    <th className="text-left p-4 font-medium text-gray-700">Citations</th>
                    <th className="text-left p-4 font-medium text-gray-700">Impact</th>
                    <th className="text-left p-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {publications.map((pub) => (
                    <tr key={pub.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="max-w-sm">
                          <p className="font-medium text-gray-900 truncate">{pub.title}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{pub.journal}</td>
                      <td className="p-4 text-gray-600">{pub.year}</td>
                      <td className="p-4">
                        <span className="font-medium text-gray-900">{pub.citations}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(pub.impact)}`}>
                          {pub.impact}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pub.status)}`}>
                          {pub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'collaborations' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Collaborators</h3>
              <div className="space-y-4">
                {collaborations.map((collab) => (
                  <div key={collab.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {collab.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{collab.name}</p>
                        <p className="text-sm text-gray-600">{collab.institution}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{collab.papers} papers</p>
                      <p className="text-sm text-gray-600">{collab.citations} citations</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Collaboration Network</h3>
              <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-sm text-gray-600">Network visualization</p>
                  <p className="text-xs text-gray-500 mt-2">12 active collaborations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Trending Research Topics</h3>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{topic.topic}</p>
                      <p className="text-sm text-gray-600">{topic.papers} papers published</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{topic.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Research Opportunities</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Emerging Gap Detected</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Limited research on "Quantum NLP" - high potential for impact
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Collaboration Opportunity</p>
                      <p className="text-sm text-green-700 mt-1">
                        Dr. Chen's research aligns 94% with your recent work
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-purple-900">Conference Deadline</p>
                      <p className="text-sm text-purple-700 mt-1">
                        ICML 2025 submission deadline in 45 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}