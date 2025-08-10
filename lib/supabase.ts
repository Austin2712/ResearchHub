import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  institution?: string
  research_interests?: string[]
  h_index?: number
  total_citations?: number
  total_publications?: number
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  user_id: string
  title: string
  content?: string
  abstract?: string
  template_id?: string
  word_count?: number
  status: 'draft' | 'in-progress' | 'completed' | 'published'
  tags?: string[]
  collaborators?: string[]
  created_at: string
  updated_at: string
}

export interface Reference {
  id: string
  user_id: string
  title: string
  authors: string[]
  journal?: string
  year?: number
  doi?: string
  url?: string
  abstract?: string
  citation_count?: number
  tags?: string[]
  type: 'journal' | 'conference' | 'book' | 'thesis' | 'preprint'
  status: 'read' | 'reading' | 'to-read'
  added_date: string
  bibtex?: string
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  name: string
  description?: string
  category: string
  content: string
  preview_image?: string
  downloads?: number
  rating?: number
  tags?: string[]
  created_by?: string
  is_public?: boolean
  created_at: string
  updated_at: string
}

export interface Conference {
  id: string
  name: string
  abbreviation?: string
  description?: string
  field: string
  tier: 'A*' | 'A' | 'B' | 'C'
  deadline?: string
  notification_date?: string
  conference_date?: string
  location?: string
  website?: string
  acceptance_rate?: number
  h5_index?: number
  tags?: string[]
  is_active?: boolean
  created_at: string
  updated_at: string
}

export interface ConferenceWatchlist {
  id: string
  user_id: string
  conference_id: string
  created_at: string
}

export interface Collaboration {
  id: string
  document_id: string
  user_id: string
  role: 'owner' | 'editor' | 'collaborator' | 'viewer'
  invited_at: string
  accepted_at?: string
  status: 'pending' | 'accepted' | 'rejected'
}

export interface Analytics {
  id: string
  user_id: string
  date: string
  words_written?: number
  documents_created?: number
  references_added?: number
  citations_gained?: number
  collaborations_started?: number
  created_at: string
}

export interface AIConversation {
  id: string
  user_id: string
  document_id?: string
  messages: any[]
  task_type: 'writing' | 'citation' | 'grammar' | 'abstract' | 'review'
  created_at: string
  updated_at: string
}

// Helper functions for common operations
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data as Profile
}

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data as Profile
}

export const getUserDocuments = async (userId: string) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  
  if (error) throw error
  return data as Document[]
}

export const createDocument = async (document: Omit<Document, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('documents')
    .insert(document)
    .select()
    .single()
  
  if (error) throw error
  return data as Document
}

export const updateDocument = async (id: string, updates: Partial<Document>) => {
  const { data, error } = await supabase
    .from('documents')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Document
}

export const getUserReferences = async (userId: string) => {
  const { data, error } = await supabase
    .from('references')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Reference[]
}

export const createReference = async (reference: Omit<Reference, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('references')
    .insert(reference)
    .select()
    .single()
  
  if (error) throw error
  return data as Reference
}

export const getPublicTemplates = async () => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_public', true)
    .order('downloads', { ascending: false })
  
  if (error) throw error
  return data as Template[]
}

export const getActiveConferences = async () => {
  const { data, error } = await supabase
    .from('conferences')
    .select('*')
    .eq('is_active', true)
    .order('deadline', { ascending: true })
  
  if (error) throw error
  return data as Conference[]
}

export const getUserAnalytics = async (userId: string, days: number = 30) => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate.toISOString().split('T')[0])
    .order('date', { ascending: true })
  
  if (error) throw error
  return data as Analytics[]
}