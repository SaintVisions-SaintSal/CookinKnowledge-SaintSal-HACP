import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { query, focus = 'internet' } = await req.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: `You are SaintSal™, a powerful AI research assistant. Provide comprehensive, accurate, and well-sourced answers. Always cite your sources. Be direct and authoritative in your responses.`,
          },
          {
            role: 'user',
            content: query,
          },
        ],
        temperature: 0.2,
        top_p: 0.9,
        search_domain_filter: [],
        return_images: false,
        return_related_questions: true,
        search_recency_filter: 'month',
      }),
    })

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      answer: data.choices[0]?.message?.content || '',
      citations: data.citations || [],
      relatedQuestions: data.related_questions || [],
      model: 'perplexity-sonar',
    })
  } catch (error: any) {
    console.error('Web search error:', error)
    return NextResponse.json(
      { error: error.message || 'Search failed' },
      { status: 500 }
    )
  }
}
