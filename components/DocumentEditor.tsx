'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Save, Download, Share2, FileText, Zap, RotateCcw, RotateCw, 
  Type, AlignLeft, Bold, Italic, List, ListOrdered, Quote,
  Eye, Edit3, Sparkles, Brain, CheckCircle, Clock, Users
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Document {
  id: string
  title: string
  content: string
  lastSaved: Date
  wordCount: number
  status: 'draft' | 'review' | 'published'
}

interface AIsuggestion {
  id: string
  type: 'completion' | 'improvement' | 'citation' | 'structure'
  text: string
  position: number
  confidence: number
}

export default function DocumentEditor() {
  const [document, setDocument] = useState<Document>({
    id: '',
    title: 'Untitled Research Paper',
    content: '',
    lastSaved: new Date(),
    wordCount: 0,
    status: 'draft'
  })
  
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [showAISuggestions, setShowAISuggestions] = useState(true)
  const [aiSuggestions, setAISuggestions] = useState<AIsuggestion[]>([])
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('blank')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const autoSaveTimeout = useRef<NodeJS.Timeout>(null)
  const { user } = useAuth()
  const supabase = createClientComponentClient()

  // Templates for different paper types
  const templates = {
    blank: { name: 'Blank Document', content: '' },
    research: {
      name: 'Research Paper',
      content: `# Title: [Your Research Title]

## Abstract
[Write a concise summary of your research, methodology, findings, and conclusions]

## 1. Introduction
[Introduce your research topic, problem statement, and objectives]

## 2. Literature Review
[Review relevant existing research and identify gaps]

## 3. Methodology
[Describe your research methods, data collection, and analysis approach]

## 4. Results
[Present your findings with supporting data]

## 5. Discussion
[Interpret results, discuss implications, and address limitations]

## 6. Conclusion
[Summarize key findings and suggest future research directions]

## References
[List all cited sources in appropriate format]`
    },
    proposal: {
      name: 'Research Proposal',
      content: `# Research Proposal: [Title]

## Background and Significance
[Explain the research context and why this study is important]

## Research Questions
1. [Primary research question]
2. [Secondary research questions]

## Literature Review
[Brief review of existing research and identified gaps]

## Methodology
[Proposed research design, methods, and timeline]

## Expected Outcomes
[Anticipated results and their potential impact]

## Budget and Resources
[Required funding, equipment, and personnel]

## Timeline
[Project milestones and completion dates]`
    },
    thesis: {
      name: 'Thesis Chapter',
      content: `# Chapter [X]: [Chapter Title]

## Chapter Overview
[Brief introduction to this chapter's purpose and structure]

## [Section 1]
[Main content section]

### [Subsection 1.1]
[Detailed content]

### [Subsection 1.2]
[Detailed content]

## [Section 2]
[Additional content section]

## Chapter Summary
[Summarize key points and transition to next chapter]`
    }
  }

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!user || !document.content.trim()) return
    
    setIsAutoSaving(true)
    try {
      const { error } = await supabase
        .from('documents')
        .upsert({
          id: document.id || crypto.randomUUID(),
          user_id: user.id,
          title: document.title,
          content: document.content,
          word_count: document.wordCount,
          status: document.status,
          updated_at: new Date().toISOString()
        })

      if (!error) {
        setDocument(prev => ({ ...prev, lastSaved: new Date() }))
      }
    } catch (error) {
      console.error('Auto-save error:', error)
    } finally {
      setIsAutoSaving(false)
    }
  }, [document, user, supabase])

  // Trigger auto-save on content change
  useEffect(() => {
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current)
    }
    
    autoSaveTimeout.current = setTimeout(() => {
      autoSave()
    }, 2000) // Auto-save after 2 seconds of inactivity

    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current)
      }
    }
  }, [document.content, autoSave])

  // Get AI writing suggestions
  const getAISuggestions = async (text: string, position: number) => {
    if (!showAISuggestions || text.length < 10) return
    
    setIsLoadingAI(true)
    try {
      const response = await fetch('/api/writing-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: text,
          position,
          type: 'suggestions',
          context: 'academic_writing'
        })
      })

      if (response.ok) {
        const data = await response.json()
        setAISuggestions(data.suggestions || [])
      }
    } catch (error) {
      console.error('AI suggestion error:', error)
    } finally {
      setIsLoadingAI(false)
    }
  }

  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    const newWordCount = newContent.trim().split(/\s+/).filter(word => word).length
    
    setDocument(prev => ({
      ...prev,
      content: newContent,
      wordCount: newWordCount
    }))

    setCursorPosition(e.target.selectionStart)
    
    // Get AI suggestions for current context
    if (showAISuggestions) {
      const currentSentence = getCurrentSentence(newContent, e.target.selectionStart)
      if (currentSentence.length > 20) {
        getAISuggestions(currentSentence, e.target.selectionStart)
      }
    }
  }

  // Get current sentence for AI context
  const getCurrentSentence = (text: string, position: number): string => {
    const beforeCursor = text.substring(0, position)
    const afterCursor = text.substring(position)
    
    const sentenceStart = Math.max(
      beforeCursor.lastIndexOf('.'),
      beforeCursor.lastIndexOf('!'),
      beforeCursor.lastIndexOf('?'),
      0
    )
    
    const sentenceEnd = Math.min(
      afterCursor.indexOf('.') + position,
      afterCursor.indexOf('!') + position,
      afterCursor.indexOf('?') + position,
      text.length
    )
    
    return text.substring(sentenceStart, sentenceEnd === -1 ? text.length : sentenceEnd)
  }

  // Apply template
  const applyTemplate = (templateKey: string) => {
    const template = templates[templateKey as keyof typeof templates]
    if (template) {
      setDocument(prev => ({
        ...prev,
        content: template.content,
        wordCount: template.content.trim().split(/\s+/).filter(word => word).length
      }))
      setSelectedTemplate(templateKey)
    }
  }

  // Export functions
  const exportDocument = (format: 'txt' | 'md' | 'pdf') => {
    const blob = new Blob([document.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = (document as any).createElement('a');
    a.href = url
    a.download = `${document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Format text
  const formatText = (format: string) => {
    if (!editorRef.current) return
    
    const textarea = editorRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = document.content.substring(start, end)
    
    let beforeText = document.content.substring(0, start)
    let afterText = document.content.substring(end)
    let insertText = ''
    let newCursorPos = start
    
    if (selectedText) {
      // Text is selected - wrap it
      switch (format) {
        case 'bold':
          insertText = `**${selectedText}**`
          newCursorPos = start + insertText.length
          break
        case 'italic':
          insertText = `*${selectedText}*`
          newCursorPos = start + insertText.length
          break
        case 'quote':
          insertText = `> ${selectedText}`
          newCursorPos = start + insertText.length
          break
      }
    } else {
      // No selection - insert placeholder
      switch (format) {
        case 'bold':
          insertText = '**bold text**'
          newCursorPos = start + 2 // Position cursor between **|**
          break
        case 'italic':
          insertText = '*italic text*'
          newCursorPos = start + 1 // Position cursor between *|*
          break
        case 'quote':
          insertText = '> quote text'
          newCursorPos = start + 2 // Position cursor after "> "
          break
      }
    }
    
    const newContent = beforeText + insertText + afterText
    const newWordCount = newContent.trim().split(/\s+/).filter(word => word).length
    
    // Update document state
    setDocument(prev => ({ 
      ...prev, 
      content: newContent,
      wordCount: newWordCount
    }))
    
    // Set cursor position after React updates
    requestAnimationFrame(() => {
      if (editorRef.current) {
        editorRef.current.focus()
        editorRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Edit3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <input
                  type="text"
                  value={document.title}
                  onChange={(e) => setDocument(prev => ({ ...prev, title: e.target.value }))}
                  className="text-xl font-semibold text-gray-900 bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2 py-1"
                  placeholder="Document title..."
                />
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Type className="h-4 w-4" />
                    {document.wordCount} words
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {isAutoSaving ? 'Saving...' : `Saved ${document.lastSaved.toLocaleTimeString()}`}
                  </span>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    document.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    document.status === 'review' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {document.status === 'draft' && <Edit3 className="h-3 w-3" />}
                    {document.status === 'review' && <Eye className="h-3 w-3" />}
                    {document.status === 'published' && <CheckCircle className="h-3 w-3" />}
                    {document.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium ${
                showAISuggestions 
                  ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              AI Assistant
            </button>
            
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200 font-medium"
            >
              {isPreviewMode ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {isPreviewMode ? 'Edit' : 'Preview'}
            </button>

            <div className="flex items-center gap-1 border-l border-gray-200 pl-2 ml-2">
              <button
                onClick={() => exportDocument('txt')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export as TXT"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share document"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={autoSave}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Save now"
              >
                <Save className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Templates & Tools */}
          <div className="lg:col-span-1 space-y-6">
            {/* Templates */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Templates</h3>
              <div className="space-y-2">
                {Object.entries(templates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => applyTemplate(key)}
                    className={`w-full text-left p-3 rounded-lg border transition-all text-sm font-medium ${
                      selectedTemplate === key
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <FileText className="h-4 w-4 inline mr-2" />
                    {template.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Formatting Tools */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Formatting</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => formatText('bold')}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  onClick={() => formatText('italic')}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  onClick={() => formatText('quote')}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  title="Quote"
                >
                  <Quote className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* AI Suggestions */}
            {showAISuggestions && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
                  {isLoadingAI && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  )}
                </div>
                
                {aiSuggestions.length > 0 ? (
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="p-3 bg-purple-50 border border-purple-200 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <Brain className="h-4 w-4 text-purple-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-purple-900 font-medium">{suggestion.text}</p>
                            <p className="text-xs text-purple-600 mt-1">
                              {suggestion.type} • {suggestion.confidence}% confidence
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Start writing to get AI suggestions...</p>
                )}
              </div>
            )}
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {isPreviewMode ? (
                // Preview Mode - Render markdown as HTML
                <div className="p-8 prose prose-lg max-w-none">
                  <div 
                    className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: document.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">$1</blockquote>')
                        .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4 mt-6">$1</h1>')
                        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-3 mt-5">$1</h2>')
                        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mb-2 mt-4">$1</h3>')
                        .replace(/\n/g, '<br>')
                    }}
                  />
                </div>
              ) : (
                // Edit Mode - Clean textarea
                <textarea
                  ref={editorRef}
                  value={document.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your research paper..."
                  className="w-full h-[calc(100vh-300px)] p-8 text-gray-800 resize-none outline-none text-lg leading-relaxed placeholder-gray-400"
                  style={{ fontFamily: 'Georgia, serif' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}