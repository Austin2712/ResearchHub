import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { content, position, type, context } = await request.json()

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    let prompt = ''
    
    switch (type) {
      case 'suggestions':
        prompt = `As an expert academic writing assistant, analyze this text and provide 3 helpful suggestions:

Text: "${content}"

Provide suggestions for:
1. **Grammar & Style**: Any grammatical improvements or style enhancements
2. **Academic Tone**: Ways to make the writing more scholarly and precise
3. **Structure**: Improvements to clarity, flow, or organization

Format your response as a JSON array with this structure:
[
  {
    "id": "unique_id",
    "type": "grammar|style|structure|citation",
    "text": "specific suggestion text",
    "confidence": confidence_score_0_to_100
  }
]

Focus on actionable, specific improvements. Keep suggestions concise but helpful.`
        break

      case 'completion':
        prompt = `As an academic writing assistant, help complete this sentence or paragraph in a scholarly, research-appropriate tone:

Current text: "${content}"

Provide 2-3 natural completion options that:
- Maintain academic tone and style
- Are grammatically correct
- Add meaningful content
- Flow naturally from the existing text

Format as JSON array:
[
  {
    "id": "completion_1",
    "type": "completion",
    "text": "completion text",
    "confidence": confidence_score
  }
]`
        break

      case 'improvement':
        prompt = `As an expert academic editor, improve this text while maintaining its meaning:

Original: "${content}"

Provide an improved version that:
- Enhances clarity and readability
- Uses more precise academic language
- Improves sentence structure
- Maintains the original meaning

Format as JSON:
{
  "improved_text": "the improved version",
  "changes_made": ["list of key improvements"],
  "confidence": confidence_score
}`
        break

      case 'citation':
        prompt = `Analyze this academic text and suggest where citations might be needed:

Text: "${content}"

Identify statements that would benefit from citations and suggest:
1. What type of source would be appropriate
2. Why a citation is needed
3. Specific claims that need support

Format as JSON array of suggestions.`
        break

      default:
        prompt = `As an academic writing assistant, provide helpful feedback on this text:

"${content}"

Give constructive suggestions for improvement in academic writing style.`
    }

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()

    // Try to parse JSON response
    let suggestions = []
    try {
      // Clean up the response to extract JSON
      const jsonMatch = text.match(/\[[\s\S]*\]/) || text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const jsonText = jsonMatch[0]
        suggestions = JSON.parse(jsonText)
      } else {
        // Fallback: create structured response from plain text
        suggestions = [{
          id: `suggestion_${Date.now()}`,
          type: type === 'suggestions' ? 'general' : type,
          text: text.slice(0, 200),
          confidence: 85
        }]
      }
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      suggestions = [{
        id: `suggestion_${Date.now()}`,
        type: 'general',
        text: text.slice(0, 200),
        confidence: 80
      }]
    }

    // Ensure suggestions is always an array
    if (!Array.isArray(suggestions)) {
      suggestions = [suggestions]
    }

    // Add unique IDs if missing
    suggestions = suggestions.map((suggestion, index) => ({
      id: suggestion.id || `suggestion_${Date.now()}_${index}`,
      type: suggestion.type || 'general',
      text: suggestion.text || suggestion.toString(),
      confidence: suggestion.confidence || 80,
      position: position
    }))

    return NextResponse.json({
      suggestions,
      timestamp: new Date().toISOString(),
      model: 'gemini-1.5-flash',
      type
    })

  } catch (error) {
    console.error('Writing Assistant AI Error:', error)
    
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
        error: 'Failed to generate writing suggestions. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}