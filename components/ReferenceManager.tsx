'use client'
import { useState } from 'react'
import { Plus, Search, Filter, Download, Upload, BookOpen, ExternalLink, Copy, Trash2, Edit, Tag, Calendar, Users, FileText, Link as LinkIcon, AlertCircle, CheckCircle2, Zap } from 'lucide-react'
import Button from './ui/Button'

interface Reference {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  doi?: string
  url?: string
  abstract?: string
  tags: string[]
  citationCount: number
  addedDate: string
  type: 'journal' | 'conference' | 'book' | 'thesis' | 'preprint'
  status: 'read' | 'to-read' | 'reading'
}

interface CitationStyle {
  name: string
  abbrev: string
  description: string
}

export default function ReferenceManager() {
  const [activeTab, setActiveTab] = useState('library')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('apa')
  const [selectedRefs, setSelectedRefs] = useState<string[]>([])
  const [importText, setImportText] = useState('')

  const citationStyles: CitationStyle[] = [
    { name: 'APA Style', abbrev: 'apa', description: 'American Psychological Association' },
    { name: 'MLA Style', abbrev: 'mla', description: 'Modern Language Association' },
    { name: 'Chicago Style', abbrev: 'chicago', description: 'Chicago Manual of Style' },
    { name: 'IEEE Style', abbrev: 'ieee', description: 'Institute of Electrical and Electronics Engineers' },
    { name: 'Harvard Style', abbrev: 'harvard', description: 'Harvard Referencing System' },
    { name: 'Vancouver Style', abbrev: 'vancouver', description: 'International Committee of Medical Journal Editors' }
  ]

  const references: Reference[] = [
    {
      id: '1',
      title: 'Attention Is All You Need',
      authors: ['Vaswani, A.', 'Shazeer, N.', 'Parmar, N.', 'Uszkoreit, J.'],
      journal: 'Advances in Neural Information Processing Systems',
      year: 2017,
      doi: '10.48550/arXiv.1706.03762',
      url: 'https://arxiv.org/abs/1706.03762',
      abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...',
      tags: ['transformer', 'attention', 'neural networks', 'nlp'],
      citationCount: 87432,
      addedDate: '2024-01-15',
      type: 'conference',
      status: 'read'
    },
    {
      id: '2',
      title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
      authors: ['Devlin, J.', 'Chang, M.W.', 'Lee, K.', 'Toutanova, K.'],
      journal: 'NAACL-HLT',
      year: 2019,
      doi: '10.18653/v1/N19-1423',
      tags: ['bert', 'transformers', 'language models', 'nlp'],
      citationCount: 65234,
      addedDate: '2024-01-18',
      type: 'conference',
      status: 'read'
    },
    {
      id: '3',
      title: 'Deep Learning',
      authors: ['Goodfellow, I.', 'Bengio, Y.', 'Courville, A.'],
      journal: 'MIT Press',
      year: 2016,
      tags: ['deep learning', 'neural networks', 'machine learning'],
      citationCount: 45123,
      addedDate: '2024-01-20',
      type: 'book',
      status: 'reading'
    },
    {
      id: '4',
      title: 'GPT-4 Technical Report',
      authors: ['OpenAI'],
      journal: 'arXiv preprint',
      year: 2023,
      doi: '10.48550/arXiv.2303.08774',
      tags: ['gpt-4', 'language models', 'artificial intelligence'],
      citationCount: 12456,
      addedDate: '2024-02-01',
      type: 'preprint',
      status: 'to-read'
    },
    {
      id: '5',
      title: 'Quantum Machine Learning',
      authors: ['Biamonte, J.', 'Wittek, P.', 'Pancotti, N.', 'Rebentrost, P.'],
      journal: 'Nature',
      year: 2017,
      doi: '10.1038/nature23474',
      tags: ['quantum computing', 'machine learning', 'quantum algorithms'],
      citationCount: 3421,
      addedDate: '2024-02-05',
      type: 'journal',
      status: 'read'
    }
  ]

  const formatCitation = (ref: Reference, style: string): string => {
    const authorsStr = ref.authors.join(', ')
    const year = ref.year.toString()
    
    switch (style) {
      case 'apa':
        return `${authorsStr} (${year}). ${ref.title}. ${ref.journal}.`
      case 'mla':
        return `${authorsStr} "${ref.title}." ${ref.journal}, ${year}.`
      case 'chicago':
        return `${authorsStr} "${ref.title}." ${ref.journal} (${year}).`
      case 'ieee':
        return `${authorsStr} "${ref.title}," ${ref.journal}, ${year}.`
      case 'harvard':
        return `${authorsStr} ${year}, '${ref.title}', ${ref.journal}.`
      case 'vancouver':
        return `${authorsStr} ${ref.title}. ${ref.journal}. ${year}.`
      default:
        return `${authorsStr} (${year}). ${ref.title}. ${ref.journal}.`
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal': return 'bg-blue-100 text-blue-800'
      case 'conference': return 'bg-green-100 text-green-800'
      case 'book': return 'bg-purple-100 text-purple-800'
      case 'thesis': return 'bg-orange-100 text-orange-800'
      case 'preprint': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'read': return 'bg-green-100 text-green-800'
      case 'reading': return 'bg-blue-100 text-blue-800'
      case 'to-read': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleImportFromDOI = () => {
    // Simulate DOI import
    alert('DOI import feature activated! Enter a DOI to automatically fetch publication details.')
  }

  const handleBulkImport = () => {
    // Simulate bulk import
    alert('Bulk import started! Upload your BibTeX, EndNote, or Zotero files.')
  }

  const handleExportBibliography = () => {
    // Generate bibliography
    const bibliography = references
      .filter(ref => selectedRefs.length === 0 || selectedRefs.includes(ref.id))
      .map(ref => formatCitation(ref, selectedStyle))
      .join('\n\n')
    
    navigator.clipboard.writeText(bibliography)
    alert('Bibliography copied to clipboard!')
  }

  const filteredReferences = references.filter(ref =>
    ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
    ref.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Reference Manager</h1>
            <p className="text-gray-600">Organize, format, and manage your research citations with AI-powered tools</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleImportFromDOI}>
              <LinkIcon className="w-4 h-4 mr-2" />
              Import DOI
            </Button>
            <Button variant="outline" onClick={handleBulkImport}>
              <Upload className="w-4 h-4 mr-2" />
              Bulk Import
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Reference
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{references.length}</p>
                <p className="text-sm text-gray-600">Total References</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">47</p>
                <p className="text-sm text-gray-600">Unique Authors</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <Tag className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">23</p>
                <p className="text-sm text-gray-600">Research Tags</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">213K</p>
                <p className="text-sm text-gray-600">Total Citations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'library', name: 'Reference Library', icon: BookOpen },
              { id: 'citation', name: 'Citation Generator', icon: FileText },
              { id: 'import', name: 'Import & Export', icon: Upload },
              { id: 'duplicates', name: 'Duplicate Finder', icon: AlertCircle }
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

        {/* Library Tab */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title, author, keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" onClick={handleExportBibliography}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Selected
                </Button>
              </div>
            </div>

            {/* References Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReferences.map((ref) => (
                <div key={ref.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRefs.includes(ref.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRefs([...selectedRefs, ref.id])
                          } else {
                            setSelectedRefs(selectedRefs.filter(id => id !== ref.id))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(ref.type)}`}>
                        {ref.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ref.status)}`}>
                        {ref.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 leading-tight">{ref.title}</h3>
                    <p className="text-sm text-gray-600">
                      {ref.authors.slice(0, 3).join(', ')}
                      {ref.authors.length > 3 && ` et al.`}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{ref.journal}</span> • {ref.year}
                    </p>
                    
                    {ref.abstract && (
                      <p className="text-sm text-gray-500 line-clamp-2">{ref.abstract}</p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {ref.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          {ref.citationCount.toLocaleString()} citations
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Added {ref.addedDate}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {ref.doi && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            DOI
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Copy className="w-3 h-3 mr-1" />
                          Cite
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Citation Generator Tab */}
        {activeTab === 'citation' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Citation Style</h3>
              <div className="space-y-3">
                {citationStyles.map((style) => (
                  <label key={style.abbrev} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="citationStyle"
                      value={style.abbrev}
                      checked={selectedStyle === style.abbrev}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{style.name}</p>
                      <p className="text-sm text-gray-600">{style.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Generated Bibliography</h3>
                <Button onClick={handleExportBibliography}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {(selectedRefs.length > 0 ? references.filter(ref => selectedRefs.includes(ref.id)) : references).map((ref) => (
                  <div key={ref.id} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {formatCitation(ref, selectedStyle)}
                    </p>
                    <button
                      onClick={() => navigator.clipboard.writeText(formatCitation(ref, selectedStyle))}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy citation
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Import & Export Tab */}
        {activeTab === 'import' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Import References</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Drop files here</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Supports BibTeX, EndNote, RIS, Zotero, Mendeley files
                  </p>
                  <Button variant="outline">Choose Files</Button>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Or paste DOI, PubMed ID, or arXiv URL:
                  </label>
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    placeholder="10.1038/nature12373&#10;https://arxiv.org/abs/1706.03762&#10;PMID: 23845944"
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Smart Import
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Export Options</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex-col">
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">BibTeX</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">EndNote</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">RIS</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">CSV</span>
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Bibliography Formats</h4>
                  <div className="space-y-2">
                    {citationStyles.map((style) => (
                      <Button key={style.abbrev} variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Export as {style.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Duplicate Finder Tab */}
        {activeTab === 'duplicates' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Duplicate Detection</h3>
                <p className="text-sm text-gray-600 mt-1">AI-powered duplicate detection and merging</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Zap className="w-4 h-4 mr-2" />
                Scan for Duplicates
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">No Duplicates Found</p>
                    <p className="text-sm text-green-700">Your reference library is clean and well-organized!</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Smart Duplicate Detection</p>
                <p className="text-sm text-gray-600 mb-4">
                  Our AI analyzes titles, authors, DOIs, and content to find potential duplicates
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Title similarity matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Author name variations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>DOI cross-referencing</span>
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