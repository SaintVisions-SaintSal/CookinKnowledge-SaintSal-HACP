import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set")
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

export const runtime = "edge"

export async function POST(req: NextRequest) {
  try {
    const { prompt, size = "1024x1024", quality = "standard", n = 1 } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Initialize client inside handler (lazy initialization)
    const openai = getOpenAIClient()

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: n,
      size: size as "1024x1024" | "1792x1024" | "1024x1792",
      quality: quality as "standard" | "hd",
      response_format: "url",
    })

    return NextResponse.json({
      images: response.data.map((img) => ({
        url: img.url,
        revised_prompt: img.revised_prompt,
      })),
    })
  } catch (error: any) {
    console.error("Image generation error:", error)

    // Handle specific OpenAI errors
    if (error.code === "content_policy_violation") {
      return NextResponse.json({ error: "Content policy violation. Please try a different prompt." }, { status: 400 })
    }

    return NextResponse.json({ error: error.message || "Failed to generate image" }, { status: 500 })
  }
}
