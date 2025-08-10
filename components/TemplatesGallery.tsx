'use client'
import { useState } from 'react'
import { Search, Filter, Grid, List, Star, Download, Eye, Clock } from 'lucide-react'
import Button from './ui/Button'

export default function TemplatesGallery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'research', name: 'Research Papers' },
    { id: 'reports', name: 'Reports' },
    { id: 'presentations', name: 'Presentations' },
    { id: 'proposals', name: 'Proposals' },
    { id: 'analysis', name: 'Data Analysis' }
  ]

  const templates = [
    // Research Paper Templates
    {
      id: 1,
      title: 'APA Research Paper Template',
      description: 'Complete APA 7th edition research paper template with title page, abstract, main body, and references. Includes proper formatting, in-text citations, and reference list.',
      category: 'research',
      rating: 4.9,
      downloads: 2340,
      preview: '/templates/apa-research-paper.png',
      tags: ['APA', 'Academic', 'Citations', 'Psychology', 'Social Sciences']
    },
    {
      id: 2,
      title: 'MLA Research Paper Template',
      description: 'MLA 9th edition compliant research paper template for humanities and literature studies. Features proper heading, Works Cited page, and in-text citations.',
      category: 'research',
      rating: 4.8,
      downloads: 1890,
      preview: '/templates/mla-research-paper.png',
      tags: ['MLA', 'Literature', 'Humanities', 'English', 'Citations']
    },
    {
      id: 3,
      title: 'Chicago Style Research Paper',
      description: 'Chicago Manual of Style research paper template with footnotes and bibliography. Perfect for history, philosophy, and cultural studies.',
      category: 'research',
      rating: 4.7,
      downloads: 1456,
      preview: '/templates/chicago-research-paper.png',
      tags: ['Chicago', 'History', 'Philosophy', 'Footnotes', 'Bibliography']
    },
    {
      id: 4,
      title: 'IEEE Research Paper Template',
      description: 'IEEE conference paper template for engineering and computer science research. Includes abstract, keywords, multi-column format, and IEEE citation style.',
      category: 'research',
      rating: 4.9,
      downloads: 2156,
      preview: '/templates/ieee-research-paper.png',
      tags: ['IEEE', 'Engineering', 'Computer Science', 'Technical', 'Conference']
    },
    {
      id: 5,
      title: 'Scientific Research Paper Template',
      description: 'IMRAD structure (Introduction, Methods, Results, Discussion) template for scientific journals. Perfect for biology, chemistry, and physics research.',
      category: 'research',
      rating: 4.8,
      downloads: 1923,
      preview: '/templates/scientific-research-paper.png',
      tags: ['IMRAD', 'Science', 'Biology', 'Chemistry', 'Physics', 'Methods']
    },
    {
      id: 6,
      title: 'Literature Review Template',
      description: 'Comprehensive literature review template with systematic organization, thematic analysis, and gap identification for research synthesis.',
      category: 'research',
      rating: 4.8,
      downloads: 1634,
      preview: '/templates/literature-review.png',
      tags: ['Literature Review', 'Synthesis', 'Analysis', 'Academic', 'Research']
    },
    {
      id: 7,
      title: 'Empirical Research Paper Template',
      description: 'Template for empirical studies with hypothesis, methodology, data analysis, and statistical results. Includes tables and figures formatting.',
      category: 'research',
      rating: 4.7,
      downloads: 1289,
      preview: '/templates/empirical-research-paper.png',
      tags: ['Empirical', 'Statistics', 'Methodology', 'Data Analysis', 'Quantitative']
    },
    {
      id: 8,
      title: 'Qualitative Research Paper Template',
      description: 'Template designed for qualitative research with interview analysis, coding frameworks, and thematic presentation of findings.',
      category: 'research',
      rating: 4.6,
      downloads: 1067,
      preview: '/templates/qualitative-research-paper.png',
      tags: ['Qualitative', 'Interviews', 'Ethnography', 'Case Study', 'Thematic Analysis']
    },
    {
      id: 9,
      title: 'Systematic Review Template',
      description: 'PRISMA-compliant systematic review template with search strategy, inclusion criteria, and meta-analysis sections.',
      category: 'research',
      rating: 4.9,
      downloads: 1445,
      preview: '/templates/systematic-review.png',
      tags: ['Systematic Review', 'PRISMA', 'Meta-analysis', 'Evidence-based', 'Healthcare']
    },
    {
      id: 10,
      title: 'Dissertation Chapter Template',
      description: 'Comprehensive dissertation chapter template with detailed structure for PhD and Masters thesis writing, including methodology and analysis chapters.',
      category: 'research',
      rating: 4.8,
      downloads: 2234,
      preview: '/templates/dissertation-chapter.png',
      tags: ['Dissertation', 'PhD', 'Masters', 'Thesis', 'Academic Writing']
    },
    {
      id: 11,
      title: 'Journal Article Template',
      description: 'Generic journal article template adaptable to various academic fields. Includes structured abstract, keywords, and standard academic formatting.',
      category: 'research',
      rating: 4.7,
      downloads: 1756,
      preview: '/templates/journal-article.png',
      tags: ['Journal', 'Publication', 'Academic', 'Peer Review', 'Scholarly']
    },
    {
      id: 12,
      title: 'Case Study Research Template',
      description: 'Structured template for case study research with background, analysis framework, findings, and implications sections.',
      category: 'research',
      rating: 4.6,
      downloads: 1123,
      preview: '/templates/case-study-research.png',
      tags: ['Case Study', 'Business', 'Research Method', 'Analysis', 'Qualitative']
    },
    {
      id: 13,
      title: 'Research Proposal Template',
      description: 'Comprehensive research proposal template for grant applications and academic submissions with budget, timeline, and methodology sections.',
      category: 'proposals',
      rating: 4.9,
      downloads: 1867,
      preview: '/templates/research-proposal.png',
      tags: ['Proposal', 'Grant', 'Funding', 'Academic', 'Research Plan']
    },
    {
      id: 14,
      title: 'Conference Paper Template',
      description: 'Short-form research paper template for academic conferences with strict page limits and presentation-focused structure.',
      category: 'research',
      rating: 4.5,
      downloads: 934,
      preview: '/templates/conference-paper.png',
      tags: ['Conference', 'Presentation', 'Short Paper', 'Academic', 'Symposium']
    },
    {
      id: 15,
      title: 'White Paper Template',
      description: 'Professional white paper template for presenting research findings to industry audiences with executive summary and recommendations.',
      category: 'reports',
      rating: 4.6,
      downloads: 1234,
      preview: '/templates/white-paper.png',
      tags: ['White Paper', 'Industry', 'Professional', 'Policy', 'Business']
    },
    {
      id: 16,
      title: 'Technical Report Template',
      description: 'Engineering and technical research report template with specifications, testing procedures, and technical analysis sections.',
      category: 'reports',
      rating: 4.7,
      downloads: 1089,
      preview: '/templates/technical-report.png',
      tags: ['Technical', 'Engineering', 'Report', 'Specifications', 'Analysis']
    }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates Gallery</h1>
          <p className="text-gray-600 mt-2">Choose from professionally designed research templates</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
      </div>

      {/* Templates Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Template Preview */}
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400">
                  <Eye className="w-8 h-8" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">{template.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600">{template.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>5 min</span>
                    </div>
                  </div>
                  
                  <Button size="sm">
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{template.title}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads} downloads</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>5 min setup</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <Button>Use Template</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}