'use client'

import { Brain, Lightbulb, BookOpen, Target, Sparkles, X } from 'lucide-react'
import Button from './ui/Button'
import Card from './ui/Card'

interface AIAssistantProps {
  isVisible: boolean
  onClose: () => void
}

export default function AIAssistant({ isVisible, onClose }: AIAssistantProps) {
  const suggestions = [
    {
      type: 'Structure',
      icon: BookOpen,
      title: 'Improve Introduction',
      suggestion: 'Consider adding a clear thesis statement at the end of your introduction paragraph.',
      confidence: 92
    },
    {
      type: 'Content',
      icon: Lightbulb,
      title: 'Add Recent Citations',
      suggestion: 'Include recent studies from 2023-2024 to strengthen your literature review.',
      confidence: 88
    },
    {
      type: 'Methodology',
      icon: Target,
      title: 'Clarify Sample Size',
      suggestion: 'Specify your sample size calculation and statistical power analysis.',
      confidence: 85
    }
  ]

  if (!isVisible) return null

  return (
    <div className="fixed right-4 top-20 w-80 z-50">
      <Card className="border-l-4 border-l-purple-500 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {suggestions.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-purple-600">{item.type}</span>
                      <span className="text-xs text-gray-500">{item.confidence}% confident</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-600">{item.suggestion}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button size="sm" className="w-full">
            <Sparkles className="w-4 h-4" />
            Get More Suggestions
          </Button>
        </div>
      </Card>
    </div>
  )
}