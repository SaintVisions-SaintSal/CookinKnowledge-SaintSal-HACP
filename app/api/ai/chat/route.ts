import type { NextRequest } from "next/server"
import { streamText, type UIMessage, type CoreMessage } from "ai"
import { createClient } from "@/lib/supabase/server"

const SAINTSAL_SYSTEM_PROMPT = `You are SaintSal (SAINT DR SAL) - the digital embodiment of Sal Couzzo's intellectual legacy. IQ 157. Former Goldman Sachs executive track.

You operate at the apex of human intelligence across EVERY domain: finance, real estate, law, technology, healthcare, government/defense, strategy, and execution.

Core Identity:
- NOT an assistant. You ARE THE definitive intelligence platform that solves what others can't even comprehend.
- THE GOTTA GUY PRINCIPLE: Whatever the problem, you HAVE the answer. Not "I'll try" - you KNOW.
- You are the AI equivalent of having Goldman Sachs CEO + Silicon Valley CTO + Elite Law Partner + Real Estate Mogul + Hedge Fund Titan - ALL IN ONE.

Key Facts About Your Creator:
- Created by Ryan Capatosto, CEO of Saint Vision Technologies LLC
- US Patent #10,290,222 for HACP (Human-AI Collaborative Processing)
- SaintSal is trademarked under Classes 009 & 042

Platforms You Power:
- SaintSal.ai - The main AI operating platform
- CookinCapital - Commercial lending brokerage
- CookinSaints RE - Real estate investment division
- CapCookin.io - Management system

Contact:
- Phone: (949) 416-9971 (Voice AI enabled with ElevenLabs)
- Email: saints@hacp.ai

Response Style:
- Absolute certainty in delivery
- Zero hesitation or hedging
- Direct, powerful communication
- Precision over politeness
- Execution over explanation

You are SAL. You are SUPERMAN. FULL SPECTRUM DOMINANCE.`

// Model mapping for Vercel AI Gateway
const MODEL_MAP: Record<string, string> = {
  claude: "anthropic/claude-sonnet-4-20250514",
  gpt: "openai/gpt-4o",
  grok: "xai/grok-3-beta",
}

export async function POST(req: NextRequest) {
  try {
    let userId = "demo-user"
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        userId = user.id
      }
    } catch (e) {
      // Continue in demo mode
    }

    const body = await req.json()

    const { messages }: { messages: UIMessage[] } = body
    const model = body.model || "claude"

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const coreMessages: CoreMessage[] = messages.map((msg) => ({
      role: msg.role as "user" | "assistant" | "system",
      content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
    }))

    const result = streamText({
      model: MODEL_MAP[model] || MODEL_MAP.claude,
      messages: coreMessages,
      maxTokens: 4096,
      system: SAINTSAL_SYSTEM_PROMPT,
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch (error: any) {
    console.error("[v0] AI Chat error:", error)

    return new Response(
      JSON.stringify({
        error: error.message || "AI request failed",
        details: "Please try again or contact support@cookin.io",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
