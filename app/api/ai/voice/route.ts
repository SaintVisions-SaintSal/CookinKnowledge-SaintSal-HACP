import { NextRequest, NextResponse } from 'next/server'

const ELEVENLABS_VOICE_ID = 'pNInz6obpgDQGcFmaJgB' // Adam - professional male voice

export async function POST(req: NextRequest) {
  try {
    const { text, voiceId = ELEVENLABS_VOICE_ID, model = 'eleven_multilingual_v2' } = await req.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY!,
        },
        body: JSON.stringify({
          text,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true,
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`)
    }

    // Get the audio as a buffer
    const audioBuffer = await response.arrayBuffer()
    
    // Convert to base64 for easy frontend consumption
    const base64Audio = Buffer.from(audioBuffer).toString('base64')

    return NextResponse.json({
      success: true,
      audio: base64Audio,
      contentType: 'audio/mpeg',
    })
  } catch (error: any) {
    console.error('Voice synthesis error:', error)
    return NextResponse.json(
      { error: error.message || 'Voice synthesis failed' },
      { status: 500 }
    )
  }
}

// GET endpoint for voice info
export async function GET() {
  try {
    // Get available voices
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch voices')
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      voices: data.voices?.slice(0, 10) || [],
      saintSalPhone: '+19499972097',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
