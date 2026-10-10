import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Gemini AI
const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || ''
const genAI = new GoogleGenerativeAI(apiKey)

export async function POST(request: NextRequest) {
  try {
    const { message, userId, context } = await request.json()

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-3.8-flash' })

    // Create a comprehensive research-focused prompt
    const systemPrompt = `You are an expert AI Research Assistant specialized in academic research and scholarly work. You help researchers with:

**Core Capabilities:**
- Literature reviews and gap analysis
- Academic writing and improvement
- Research methodology suggestions
- Data analysis and interpretation
- Citation formatting and reference management
- Research planning and project management
- Conference and journal recommendations
- Collaboration strategies

**Communication Style:**
- Be precise, scholarly, and evidence-based
- Use clear structure with headers, bullet points, and numbered lists
- Provide actionable insights and specific recommendations
- Include relevant examples when helpful
- Be encouraging but maintain academic rigor

**Current Context:**
${context ? `Previous conversation context:\n${context}\n` : ''}

**User Query:** ${message}

Please provide a comprehensive, helpful response that addresses the user's research needs.`

    // Generate content
    const result = await model.generateContent(systemPrompt)
    const response = await result.response
    const text = response.text()

    // Log the interaction (optional, for analytics)
    console.log(`AI Chat - User: ${userId || 'anonymous'} - Query length: ${message.length} - Response length: ${text.length}`)

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString(),
      model: 'gemini-3.8-flash'
    })

  } catch (error) {
    console.error('Gemini AI Error:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your Gemini API configuration.' },
          { status: 401 }
        )
      }
      
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again later.' },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { 
        error: 'Failed to generate AI response. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}