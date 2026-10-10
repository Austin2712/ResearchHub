'use client'

import React, { useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { 
  Bold, 
  Italic, 
  Strikethrough,
  Code,
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  AlignJustify,
  List, 
  ListOrdered, 
  Quote,
  Minus,
  Undo, 
  Redo,
  Eye,
  EyeOff,
  Save,
  Bot,
  Users,
  MessageSquare,
  Plus,
  FileText,
  Hash,
  Download,
  Share2
} from 'lucide-react'

// Custom extensions would go here in a real app
const extensions = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Typography,
  Placeholder.configure({
    placeholder: 'Start writing your research paper...',
    emptyEditorClass: 'is-editor-empty',
  }),
  CharacterCount,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
]

export default function TiptapDocumentEditor() {
  const [isPreview, setIsPreview] = useState(false)
  const [activeTab, setActiveTab] = useState('ai')
  const [saveStatus, setSaveStatus] = useState('saved')
  const [comments, setComments] = useState([
    { id: 1, author: 'Dr. Smith', text: 'Great introduction!', timestamp: '2 hours ago', position: 150 },
    { id: 2, author: 'Sarah Chen', text: 'Need more citations here', timestamp: '1 hour ago', position: 300 }
  ])
  const [newComment, setNewComment] = useState('')

  const editor = useEditor({
    extensions,
    content: `
      <h1>Research Paper Title</h1>
      <p>Start writing your research paper here. This editor supports rich text formatting, collaboration features, and AI assistance.</p>
      <h2>Introduction</h2>
      <p>Your research begins with a strong introduction...</p>
    `,
    immediatelyRender: false,
    onUpdate: () => {
      setSaveStatus('saving')
      // Simulate auto-save
      setTimeout(() => setSaveStatus('saved'), 1000)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-8 py-6',
      },
    },
  })

  type TemplateKey = 'abstract' | 'introduction' | 'methodology' | 'results' | 'conclusion' | 'references';

  const insertTemplate = useCallback((template: TemplateKey) => {
    if (!editor) return

    const templates: Record<TemplateKey, string> = {
      abstract: `
        <h2>Abstract</h2>
        <p>This paper presents a comprehensive analysis of... The methodology employed... Key findings indicate... These results have significant implications for...</p>
      `,
      introduction: `
        <h2>Introduction</h2>
        <p>The purpose of this study is to investigate... Previous research has shown... However, there remains a gap in understanding... This research aims to address...</p>
      `,
      methodology: `
        <h2>Methodology</h2>
        <h3>Research Design</h3>
        <p>This research employed a mixed-methods approach...</p>
        <h3>Participants</h3>
        <p>The study included...</p>
        <h3>Data Collection</h3>
        <p>Data was collected through...</p>
      `,
      results: `
        <h2>Results</h2>
        <p>The analysis revealed several key findings...</p>
        <h3>Quantitative Results</h3>
        <p>Statistical analysis showed...</p>
        <h3>Qualitative Findings</h3>
        <p>Thematic analysis identified...</p>
      `,
      conclusion: `
        <h2>Conclusion</h2>
        <p>In conclusion, this study found that... These findings contribute to... Future research should investigate... The limitations of this study include...</p>
      `,
      references: `
        <h2>References</h2>
        <p>Author, A. (2024). <em>Title of Paper</em>. Journal Name, 1(1), 1-10.</p>
      `
    }

    editor.commands.insertContent(templates[template])
  }, [editor])

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'You',
        text: newComment,
        timestamp: 'Just now',
        position: editor?.state.selection.from || 0
      }
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  if (!editor) {
    return <div className="h-screen flex items-center justify-center">Loading editor...</div>
  }

  const wordCount = editor.storage.characterCount.words()
  const charCount = editor.storage.characterCount.characters()

  return (
    <div className="h-screen flex bg-gray-50 text-gray-600">
      {/* Left Sidebar - Tools & Templates */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Research Tools</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Quick Templates */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Insert</h4>
            <div className="space-y-2">
              {[
                { key: 'abstract', label: 'Abstract', icon: FileText },
                { key: 'introduction', label: 'Introduction', icon: FileText },
                { key: 'methodology', label: 'Methodology', icon: FileText },
                { key: 'results', label: 'Results', icon: Hash },
                { key: 'conclusion', label: 'Conclusion', icon: FileText },
                { key: 'references', label: 'References', icon: Quote }
              ].map(template => (
                <button
                  key={template.key}
                  onClick={() => insertTemplate(template.key as TemplateKey)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <template.icon className="h-4 w-4" />
                  {template.label}
                </button>
              ))}
            </div>
          </div>

          {/* Document Stats */}
          <div className="p-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Document Stats</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Words:</span>
                <span className="font-medium">{wordCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Characters:</span>
                <span className="font-medium">{charCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Reading Time:</span>
                <span className="font-medium">{Math.max(1, Math.ceil(wordCount / 200))} min</span>
              </div>
              <div className="flex justify-between">
                <span>Pages:</span>
                <span className="font-medium">{Math.max(1, Math.ceil(wordCount / 250))}</span>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="p-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Export</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                <Download className="h-4 w-4" />
                Export PDF
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                <Download className="h-4 w-4" />
                Export Word
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                <Share2 className="h-4 w-4" />
                Share Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* Text Formatting */}
              <div className="flex items-center gap-1 mr-4">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive('bold') ? 'bg-gray-200' : ''
                  }`}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive('italic') ? 'bg-gray-200' : ''
                  }`}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive('strike') ? 'bg-gray-200' : ''
                  }`}
                  title="Strikethrough"
                >
                  <Strikethrough className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive('code') ? 'bg-gray-200' : ''
                  }`}
                  title="Code"
                >
                  <Code className="h-4 w-4" />
                </button>
              </div>

              {/* Headings */}
              <div className="flex items-center gap-1 mr-4">
                <select
                  onChange={(e) => {
                    const level = parseInt(e.target.value)
                    if (level === 0) {
                      editor.chain().focus().setParagraph().run()
                    } else {
                      editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()
                    }
                  }}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="0">Paragraph</option>
                  <option value="1">Heading 1</option>
                  <option value="2">Heading 2</option>
                  <option value="3">Heading 3</option>
                </select>
              </div>

              {/* Alignment */}
              <div className="flex items-center gap-1 mr-4">
                <button
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                  }`}
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                  }`}
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                  }`}
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''
                  }`}
                  title="Justify"
                >
                  <AlignJustify className="h-4 w-4" />
                </button>
              </div>

              {/* Lists */}
              <div className="flex items-center gap-1 mr-4">
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive('bulletList') ? 'bg-gray-200' : ''
                  }`}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive('orderedList') ? 'bg-gray-200' : ''
                  }`}
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${
                    editor.isActive('blockquote') ? 'bg-gray-200' : ''
                  }`}
                  title="Quote"
                >
                  <Quote className="h-4 w-4" />
                </button>
              </div>

              {/* Other formatting */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => editor.chain().focus().setHorizontalRule().run()}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title="Horizontal Rule"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title="Undo"
                  disabled={!editor.can().undo()}
                >
                  <Undo className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  title="Redo"
                  disabled={!editor.can().redo()}
                >
                  <Redo className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className={`h-2 w-2 rounded-full ${
                  saveStatus === 'saved' ? 'bg-green-500' : 
                  saveStatus === 'saving' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="capitalize">{saveStatus}</span>
              </div>
              
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm"
              >
                {isPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {isPreview ? 'Edit' : 'Preview'}
              </button>

              <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors text-sm">
                <Save className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          {isPreview ? (
            <div className="max-w-4xl mx-auto p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
              />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <EditorContent 
                editor={editor} 
                className="min-h-[600px] focus-within:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - AI & Collaboration */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { key: 'ai', label: 'AI', icon: Bot },
            { key: 'team', label: 'Team', icon: Users },
            { key: 'comments', label: 'Comments', icon: MessageSquare }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'ai' && (
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-4">AI Writing Assistant</h4>
              
              <div className="space-y-4">
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                  <div className="text-sm font-medium text-blue-900 mb-1">Improve Writing</div>
                  <div className="text-xs text-blue-700">Get suggestions to enhance clarity and flow</div>
                </button>
                
                <button className="w-full text-left p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors">
                  <div className="text-sm font-medium text-green-900 mb-1">Find Citations</div>
                  <div className="text-xs text-green-700">Discover relevant research papers and sources</div>
                </button>
                
                <button className="w-full text-left p-3 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors">
                  <div className="text-sm font-medium text-purple-900 mb-1">Generate Abstract</div>
                  <div className="text-xs text-purple-700">Auto-generate abstract from your content</div>
                </button>
                
                <button className="w-full text-left p-3 bg-orange-50 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors">
                  <div className="text-sm font-medium text-orange-900 mb-1">Check Grammar</div>
                  <div className="text-xs text-orange-700">Review and fix grammar issues</div>
                </button>
              </div>

              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Recent Suggestions</h5>
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">
                    • Consider expanding the methodology section
                  </div>
                  <div className="text-xs text-gray-600">
                    • Add more recent citations (2023-2024)
                  </div>
                  <div className="text-xs text-gray-600">
                    • Improve transition between paragraphs
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-4">Collaborators</h4>
              
              <div className="space-y-3 mb-4">
                {[
                  { name: 'Dr. Sarah Smith', status: 'online', avatar: 'SS', role: 'Editor' },
                  { name: 'John Chen', status: 'offline', avatar: 'JC', role: 'Reviewer' },
                  { name: 'Maria Garcia', status: 'online', avatar: 'MG', role: 'Contributor' }
                ].map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-medium text-white">
                        {member.avatar}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors text-gray-600">
                <Plus className="h-4 w-4" />
                Invite Collaborator
              </button>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-4">Comments</h4>
              
              {/* Add Comment */}
              <div className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <button
                  onClick={addComment}
                  className="mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Add Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {comments.map(comment => (
                  <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                    <button className="text-xs text-blue-600 hover:text-blue-800 mt-1">
                      Reply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          line-height: 1.8;
          font-size: 16px;
        }
        
        .ProseMirror.is-editor-empty::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        
        .ProseMirror h1 {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 1.5rem 0 1rem 0;
        }
        
        .ProseMirror h2 {
          font-size: 1.875rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 1.25rem 0 0.75rem 0;
        }
        
        .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 1rem 0 0.5rem 0;
        }
        
        .ProseMirror p {
          margin: 0.75rem 0;
        }
        
        .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }
        
        .ProseMirror li {
          margin: 0.25rem 0;
        }
        
        .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }
        
        .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  )
}