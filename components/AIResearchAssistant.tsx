'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, FileText, BarChart3, Users, Lightbulb, Download, Copy, Trash2, Bot, User, LucideIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  category?: 'research' | 'writing' | 'analysis' | 'general'
}

interface ResearchTool {
  id: string
  name: string
  icon: LucideIcon
  description: string
  prompt: string
}

export function AIResearchAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI Research Assistant powered by Gemini 3.8 Flash. I can help you with:\n\n• **Literature Reviews** - Analyze papers and find research gaps\n• **Writing Assistance** - Improve academic writing and structure  \n• **Data Analysis** - Interpret results and suggest methodologies\n• **Citation Help** - Format references and suggest relevant papers\n• **Research Planning** - Create timelines and identify opportunities\n\nWhat would you like to work on today?',
      timestamp: new Date(),
      category: 'general'
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useUser()

  const researchTools: ResearchTool[] = [
    {
      id: 'literature',
      name: 'Literature Review',
      icon: FileText,
      description: 'Analyze papers and identify research gaps',
      prompt: 'Help me conduct a comprehensive literature review on'
    },
    {
      id: 'analysis',
      name: 'Data Analysis',
      icon: BarChart3,
      description: 'Interpret results and suggest methodologies',
      prompt: 'Help me analyze this research data and interpret the results:'
    },
    {
      id: 'collaboration',
      name: 'Research Planning',
      icon: Users,
      description: 'Create research timelines and strategies',
      prompt: 'Help me create a comprehensive research plan for'
    },
    {
      id: 'innovation',
      name: 'Innovation Ideas',
      icon: Lightbulb,
      description: 'Generate novel research directions',
      prompt: 'Suggest innovative research directions and opportunities in'
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          userId: user?.id,
          userName: user?.firstName || user?.fullName || 'Researcher',
          context: messages.slice(-5).map(m => `${m.type}: ${m.content}`).join('\n')
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to get AI response')
      }

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('AI response error:', error)
      return "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment, or check if your Gemini API key is properly configured."
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      category: 'general'
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(inputMessage)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        category: 'general'
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
        category: 'general'
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  const handleToolSelect = (tool: ResearchTool) => {
    setSelectedTool(tool.id)
    setInputMessage(tool.prompt + ' ')
    document.getElementById('message-input')?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const exportChat = () => {
    const chatContent = messages.map(m => 
      `${m.type.toUpperCase()} (${m.timestamp.toLocaleString()}): ${m.content}`
    ).join('\n\n')
    
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `research-chat-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearChat = () => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI Research Assistant. How can I help you with your research today?',
      timestamp: new Date(),
      category: 'general'
    }])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Research Laboratory</h1>
                <p className="text-gray-600">Powered by Google Gemini • Real-time AI assistance</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportChat}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
              <button
                onClick={clearChat}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Research Tools Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Research Tools
              </h3>
              
              <div className="space-y-3">
                {researchTools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolSelect(tool)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedTool === tool.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{tool.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{tool.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Session Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Messages:</span>
                    <span className="font-medium">{messages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">AI Model:</span>
                    <span className="font-medium">Gemini</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">● Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-[calc(100vh-200px)]">
              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-blue-600' 
                            : 'bg-gradient-to-r from-purple-600 to-blue-600'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        
                        <div className={`flex flex-col gap-2 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-50 text-gray-900 border border-gray-200'
                          }`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            {message.type === 'ai' && (
                              <button
                                onClick={() => copyMessage(message.content)}
                                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                              >
                                <Copy className="h-3 w-3" />
                                Copy
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-4 justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="animate-pulse flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            <span className="text-sm text-gray-500">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <textarea
                      id="message-input"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your research..."
                      className="w-full p-4 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={2}
                      disabled={isLoading}
                    />
                    <button
                      onClick={() => setIsListening(!isListening)}
                      className={`absolute right-3 top-3 p-2 rounded-lg transition-colors ${
                        isListening 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Press Enter to send • Shift+Enter for new line • Powered by Google Gemini
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIResearchAssistant