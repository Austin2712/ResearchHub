'use client'

import { useState } from 'react'
import { 
  Users, 
  MessageSquare, 
  Clock, 
  GitBranch, 
  UserPlus, 
  Crown, 
  Edit3, 
  Eye,
  Bell,
  Activity,
  Calendar,
  CheckCircle,
  AlertCircle,
  Coffee,
  Video,
  Share2,
  Settings,
  MoreHorizontal,
  Star,
  Filter
} from 'lucide-react'
import Button from './ui/Button'
import Card from './ui/Card'

interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: 'owner' | 'editor' | 'reviewer' | 'viewer'
  status: 'online' | 'away' | 'offline'
  lastActive: string
  contributions: number
}

interface Project {
  id: string
  title: string
  description: string
  members: TeamMember[]
  lastEdited: string
  status: 'active' | 'review' | 'completed'
  progress: number
  comments: number
  versions: number
}

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  resolved: boolean
  replies: number
}

interface Activity {
  id: string
  type: 'edit' | 'comment' | 'join' | 'version'
  user: string
  action: string
  timestamp: string
  project: string
}

export default function CollaborationHub() {
  const [activeTab, setActiveTab] = useState<string>('projects')
  const [selectedProject, setSelectedProject] = useState<string>('1')

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@university.edu',
      avatar: 'SC',
      role: 'owner',
      status: 'online',
      lastActive: '2 minutes ago',
      contributions: 247
    },
    {
      id: '2',
      name: 'Prof. Michael Rodriguez',
      email: 'm.rodriguez@research.org',
      avatar: 'MR',
      role: 'editor',
      status: 'online',
      lastActive: '5 minutes ago',
      contributions: 156
    },
    {
      id: '3',
      name: 'Dr. Emily Watson',
      email: 'e.watson@lab.com',
      avatar: 'EW',
      role: 'reviewer',
      status: 'away',
      lastActive: '1 hour ago',
      contributions: 89
    },
    {
      id: '4',
      name: 'Alex Kumar',
      email: 'alex.kumar@student.edu',
      avatar: 'AK',
      role: 'viewer',
      status: 'offline',
      lastActive: '3 hours ago',
      contributions: 34
    }
  ]

  const projects: Project[] = [
    {
      id: '1',
      title: 'AI Ethics in Healthcare',
      description: 'Comprehensive study on ethical implications of AI in medical diagnosis',
      members: teamMembers.slice(0, 3),
      lastEdited: '5 minutes ago',
      status: 'active',
      progress: 75,
      comments: 12,
      versions: 8
    },
    {
      id: '2',
      title: 'Quantum Computing Applications',
      description: 'Research on practical applications of quantum computing in cryptography',
      members: teamMembers.slice(0, 2),
      lastEdited: '2 hours ago',
      status: 'review',
      progress: 90,
      comments: 6,
      versions: 12
    },
    {
      id: '3',
      title: 'Climate Change Modeling',
      description: 'Advanced machine learning models for climate prediction',
      members: teamMembers,
      lastEdited: '1 day ago',
      status: 'active',
      progress: 45,
      comments: 18,
      versions: 5
    }
  ]

  const comments: Comment[] = [
    {
      id: '1',
      author: 'Dr. Sarah Chen',
      avatar: 'SC',
      content: 'The methodology section needs more detail on the data collection process. Consider adding a flowchart.',
      timestamp: '2 hours ago',
      resolved: false,
      replies: 2
    },
    {
      id: '2',
      author: 'Prof. Michael Rodriguez',
      avatar: 'MR',
      content: 'Excellent analysis in the results section! The statistical significance is well-demonstrated.',
      timestamp: '4 hours ago',
      resolved: true,
      replies: 0
    },
    {
      id: '3',
      author: 'Dr. Emily Watson',
      avatar: 'EW',
      content: 'Reference 15 seems outdated. I found a more recent study from 2024 that contradicts these findings.',
      timestamp: '6 hours ago',
      resolved: false,
      replies: 1
    }
  ]

  const activities: Activity[] = [
    {
      id: '1',
      type: 'edit',
      user: 'Dr. Sarah Chen',
      action: 'edited the Introduction section',
      timestamp: '5 minutes ago',
      project: 'AI Ethics in Healthcare'
    },
    {
      id: '2',
      type: 'comment',
      user: 'Prof. Michael Rodriguez',
      action: 'added a comment on line 47',
      timestamp: '12 minutes ago',
      project: 'AI Ethics in Healthcare'
    },
    {
      id: '3',
      type: 'version',
      user: 'Dr. Emily Watson',
      action: 'created version 2.3',
      timestamp: '1 hour ago',
      project: 'Quantum Computing Applications'
    },
    {
      id: '4',
      type: 'join',
      user: 'Alex Kumar',
      action: 'joined the project',
      timestamp: '2 hours ago',
      project: 'Climate Change Modeling'
    }
  ]

  const tabs = [
    { id: 'projects', name: 'Team Projects', icon: Users },
    { id: 'comments', name: 'Comments', icon: MessageSquare },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'team', name: 'Team Members', icon: Crown }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800'
      case 'editor': return 'bg-blue-100 text-blue-800'
      case 'reviewer': return 'bg-green-100 text-green-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Users className="w-8 h-8 text-white" />
            </div>
            Collaboration Hub
          </h1>
          <p className="text-xl text-gray-600">
            Work together on research projects with real-time collaboration and smart workflows.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Video className="w-4 h-4" />
            Start Meeting
          </Button>
          <Button>
            <UserPlus className="w-4 h-4" />
            Invite Members
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
        </Card>
        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
        </Card>
        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">36</div>
            <div className="text-sm text-gray-600">Active Comments</div>
          </div>
        </Card>
        <Card className="text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">25</div>
            <div className="text-sm text-gray-600">Document Versions</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Team Projects</h2>
                <Button>
                  <UserPlus className="w-4 h-4" />
                  New Project
                </Button>
              </div>
              
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                        
                        {/* Project Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {project.lastEdited}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {project.comments} comments
                          </span>
                          <span className="flex items-center gap-1">
                            <GitBranch className="w-4 h-4" />
                            v{project.versions}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'active' ? 'bg-green-100 text-green-800' :
                          project.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {project.status}
                        </span>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Team:</span>
                        <div className="flex -space-x-2">
                          {project.members.map((member) => (
                            <div
                              key={member.id}
                              className="relative w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                              title={member.name}
                            >
                              {member.avatar}
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button size="sm">
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Recent Comments</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="w-4 h-4" />
                    Mark All Read
                  </Button>
                </div>
              </div>
              
              {comments.map((comment) => (
                <Card key={comment.id} className={`${comment.resolved ? 'opacity-75' : ''}`}>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {comment.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">{comment.author}</span>
                          <span className="text-sm text-gray-500">{comment.timestamp}</span>
                          {comment.resolved && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Resolved
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3">{comment.content}</p>
                        <div className="flex items-center gap-3">
                          <Button variant="outline" size="sm">
                            Reply ({comment.replies})
                          </Button>
                          {!comment.resolved && (
                            <Button variant="outline" size="sm">
                              <CheckCircle className="w-4 h-4" />
                              Resolve
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              
              {activities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'edit' ? 'bg-blue-100' :
                        activity.type === 'comment' ? 'bg-green-100' :
                        activity.type === 'version' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        {activity.type === 'edit' && <Edit3 className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'comment' && <MessageSquare className="w-4 h-4 text-green-600" />}
                        {activity.type === 'version' && <GitBranch className="w-4 h-4 text-purple-600" />}
                        {activity.type === 'join' && <UserPlus className="w-4 h-4 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <span>{activity.timestamp}</span>
                          <span>•</span>
                          <span>{activity.project}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                <Button>
                  <UserPlus className="w-4 h-4" />
                  Invite Member
                </Button>
              </div>
              
              {teamMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            {member.name}
                            {member.role === 'owner' && <Crown className="w-4 h-4 text-yellow-500" />}
                          </h3>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                              {member.role}
                            </span>
                            <span className="text-xs text-gray-500">
                              {member.contributions} contributions
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1 text-xs ${
                          member.status === 'online' ? 'text-green-600' :
                          member.status === 'away' ? 'text-yellow-600' :
                          'text-gray-500'
                        }`}>
                          <div className={`w-2 h-2 ${getStatusColor(member.status)} rounded-full`}></div>
                          {member.status} • {member.lastActive}
                        </span>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Online Members */}
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-green-600" />
                Online Now ({teamMembers.filter(m => m.status === 'online').length})
              </h3>
              <div className="space-y-3">
                {teamMembers.filter(member => member.status === 'online').map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {member.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">Active now</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Share2 className="w-4 h-4" />
                  Share Project
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Bell className="w-4 h-4" />
                  Notification Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <GitBranch className="w-4 h-4" />
                  Version History
                </Button>
              </div>
            </div>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notifications
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900">New comment on AI Ethics paper</p>
                    <p className="text-gray-500 text-xs">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900">Version 2.3 approved by reviewer</p>
                    <p className="text-gray-500 text-xs">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900">Alex Kumar joined the team</p>
                    <p className="text-gray-500 text-xs">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}