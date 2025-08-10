'use client'

import { useState } from 'react'
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  Clock, 
  Award, 
  Filter,
  ExternalLink,
  Bell,
  Brain,
  TrendingUp
} from 'lucide-react'
import Button from './ui/Button'
import Card from './ui/Card'

interface Conference {
  id: string
  name: string
  acronym: string
  field: string
  location: string
  date: string
  deadline: string
  acceptanceRate: number
  rating: number
  description: string
  topics: string[]
  tier: 'A*' | 'A' | 'B' | 'C'
  type: 'hybrid' | 'virtual' | 'in-person'
  website: string
  isRecommended?: boolean
  matchScore?: number
}

const conferences: Conference[] = [
  {
    id: '1',
    name: 'International Conference on Machine Learning',
    acronym: 'ICML',
    field: 'Computer Science',
    location: 'Honolulu, Hawaii',
    date: 'July 23-29, 2025',
    deadline: 'January 31, 2025',
    acceptanceRate: 22,
    rating: 4.9,
    description: 'Premier venue for machine learning research with cutting-edge papers and networking.',
    topics: ['Machine Learning', 'Deep Learning', 'AI', 'Neural Networks'],
    tier: 'A*',
    type: 'hybrid',
    website: 'https://icml.cc',
    isRecommended: true,
    matchScore: 95
  },
  {
    id: '2',
    name: 'Neural Information Processing Systems',
    acronym: 'NeurIPS',
    field: 'Computer Science',
    location: 'New Orleans, Louisiana',
    date: 'December 8-14, 2025',
    deadline: 'May 22, 2025',
    acceptanceRate: 20,
    rating: 4.9,
    description: 'Leading conference in neural information processing and machine learning.',
    topics: ['Neural Networks', 'Machine Learning', 'Computational Neuroscience'],
    tier: 'A*',
    type: 'in-person',
    website: 'https://neurips.cc',
    isRecommended: true,
    matchScore: 92
  },
  {
    id: '3',
    name: 'Conference on Computer Vision and Pattern Recognition',
    acronym: 'CVPR',
    field: 'Computer Science',
    location: 'Seattle, Washington',
    date: 'June 16-20, 2025',
    deadline: 'November 15, 2024',
    acceptanceRate: 25,
    rating: 4.8,
    description: 'Top-tier conference for computer vision and pattern recognition research.',
    topics: ['Computer Vision', 'Pattern Recognition', 'Image Processing'],
    tier: 'A*',
    type: 'hybrid',
    website: 'https://cvpr.thecvf.com',
    matchScore: 88
  },
  {
    id: '4',
    name: 'International Conference on Learning Representations',
    acronym: 'ICLR',
    field: 'Computer Science',
    location: 'Vienna, Austria',
    date: 'May 6-10, 2025',
    deadline: 'October 1, 2024',
    acceptanceRate: 31,
    rating: 4.7,
    description: 'Leading venue for deep learning and representation learning research.',
    topics: ['Deep Learning', 'Representation Learning', 'Neural Networks'],
    tier: 'A*',
    type: 'hybrid',
    website: 'https://iclr.cc',
    matchScore: 85
  },
  {
    id: '5',
    name: 'International Conference on Artificial Intelligence',
    acronym: 'IJCAI',
    field: 'Computer Science',
    location: 'Montreal, Canada',
    date: 'August 19-25, 2025',
    deadline: 'January 15, 2025',
    acceptanceRate: 20,
    rating: 4.6,
    description: 'Premier international conference on artificial intelligence research.',
    topics: ['Artificial Intelligence', 'Knowledge Representation', 'Multi-Agent Systems'],
    tier: 'A*',
    type: 'hybrid',
    website: 'https://ijcai.org',
    matchScore: 82
  },
  {
    id: '6',
    name: 'Association for Computational Linguistics',
    acronym: 'ACL',
    field: 'Computer Science',
    location: 'Bangkok, Thailand',
    date: 'August 1-6, 2025',
    deadline: 'February 15, 2025',
    acceptanceRate: 25,
    rating: 4.5,
    description: 'Leading conference in natural language processing and computational linguistics.',
    topics: ['Natural Language Processing', 'Computational Linguistics', 'Text Mining'],
    tier: 'A*',
    type: 'hybrid',
    website: 'https://aclweb.org',
    matchScore: 78
  },
  {
    id: '7',
    name: 'International Conference on Robotics and Automation',
    acronym: 'ICRA',
    field: 'Engineering',
    location: 'London, UK',
    date: 'May 26-30, 2025',
    deadline: 'September 15, 2024',
    acceptanceRate: 40,
    rating: 4.4,
    description: 'Premier conference for robotics and automation research.',
    topics: ['Robotics', 'Automation', 'Control Systems', 'AI'],
    tier: 'A',
    type: 'in-person',
    website: 'https://icra.org',
    matchScore: 75
  },
  {
    id: '8',
    name: 'International Conference on Medical Imaging',
    acronym: 'MICCAI',
    field: 'Medicine',
    location: 'Munich, Germany',
    date: 'October 6-10, 2025',
    deadline: 'March 17, 2025',
    acceptanceRate: 32,
    rating: 4.3,
    description: 'Leading conference in medical image computing and computer-assisted intervention.',
    topics: ['Medical Imaging', 'Computer Vision', 'Healthcare AI'],
    tier: 'A',
    type: 'hybrid',
    website: 'https://miccai.org',
    matchScore: 70
  }
]

export default function ConferenceDiscovery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedField, setSelectedField] = useState('all')
  const [selectedTier, setSelectedTier] = useState('all')
  const [showRecommended, setShowRecommended] = useState(false)
  const [watchlist, setWatchlist] = useState<string[]>([])

  const fields = ['all', 'Computer Science', 'Engineering', 'Medicine', 'Physics', 'Biology']
  const tiers = ['all', 'A*', 'A', 'B', 'C']

  const filteredConferences = conferences.filter(conf => {
    const matchesSearch = conf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conf.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conf.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesField = selectedField === 'all' || conf.field === selectedField
    const matchesTier = selectedTier === 'all' || conf.tier === selectedTier
    const matchesRecommended = !showRecommended || conf.isRecommended

    return matchesSearch && matchesField && matchesTier && matchesRecommended
  })

  const toggleWatchlist = (confId: string) => {
    setWatchlist(prev => 
      prev.includes(confId) 
        ? prev.filter(id => id !== confId)
        : [...prev, confId]
    )
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getDeadlineStatus = (deadline: string) => {
    const days = getDaysUntilDeadline(deadline)
    if (days < 0) return { color: 'text-red-600', bg: 'bg-red-50', label: 'Passed' }
    if (days <= 30) return { color: 'text-orange-600', bg: 'bg-orange-50', label: `${days} days` }
    if (days <= 90) return { color: 'text-yellow-600', bg: 'bg-yellow-50', label: `${days} days` }
    return { color: 'text-green-600', bg: 'bg-green-50', label: `${days} days` }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Conference Discovery
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find the perfect conferences for your research with AI-powered recommendations and smart deadline tracking.
        </p>
      </div>

      {/* AI Recommendations Banner */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI-Powered Recommendations</h3>
              <p className="text-gray-600">Based on your research interests and writing patterns</p>
            </div>
          </div>
          <Button 
            variant={showRecommended ? 'primary' : 'outline'}
            onClick={() => setShowRecommended(!showRecommended)}
          >
            <TrendingUp className="w-4 h-4" />
            {showRecommended ? 'Show All' : 'Show Recommended'}
          </Button>
        </div>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search conferences, topics, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-4">
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {fields.map(field => (
              <option key={field} value={field}>
                {field === 'all' ? 'All Fields' : field}
              </option>
            ))}
          </select>
          
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {tiers.map(tier => (
              <option key={tier} value={tier}>
                {tier === 'all' ? 'All Tiers' : `Tier ${tier}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Conference Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredConferences.map((conf) => {
          const deadlineStatus = getDeadlineStatus(conf.deadline)
          const isWatched = watchlist.includes(conf.id)
          
          return (
            <Card key={conf.id} className={`relative overflow-hidden ${conf.isRecommended ? 'ring-2 ring-purple-200' : ''}`}>
              {conf.isRecommended && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  {conf.matchScore}% Match
                </div>
              )}
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{conf.acronym}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        conf.tier === 'A*' ? 'bg-gold-100 text-gold-800' :
                        conf.tier === 'A' ? 'bg-blue-100 text-blue-800' :
                        conf.tier === 'B' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        Tier {conf.tier}
                      </span>
                    </div>
                    <h4 className="text-lg text-gray-700 font-medium mb-2">{conf.name}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{conf.description}</p>
                  </div>
                </div>

                {/* Conference Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{conf.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{conf.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{conf.acceptanceRate}% acceptance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{conf.rating}/5.0 rating</span>
                  </div>
                </div>

                {/* Deadline Status */}
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium mb-4 ${deadlineStatus.bg} ${deadlineStatus.color}`}>
                  <Clock className="w-4 h-4" />
                  <span>Deadline: {conf.deadline} ({deadlineStatus.label})</span>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {conf.topics.slice(0, 3).map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                  {conf.topics.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      +{conf.topics.length - 3} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="primary" size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </Button>
                  <Button 
                    variant={isWatched ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => toggleWatchlist(conf.id)}
                  >
                    <Bell className="w-4 h-4" />
                    {isWatched ? 'Watching' : 'Watch'}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredConferences.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No conferences found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}