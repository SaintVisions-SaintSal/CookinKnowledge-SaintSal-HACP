// Environment variable validation for production safety

interface EnvConfig {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string

  // AI APIs
  ANTHROPIC_API_KEY: string
  OPENAI_API_KEY: string
  XAI_API_KEY: string

  // Email
  RESEND_API_KEY: string

  // Optional
  GHL_API_KEY?: string
  ELEVENLABS_API_KEY?: string
}

function validateEnv(): EnvConfig {
  const requiredEnvVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "ANTHROPIC_API_KEY",
    "OPENAI_API_KEY",
    "XAI_API_KEY",
    "RESEND_API_KEY",
  ]

  const missing = requiredEnvVars.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }

  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY!,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
    XAI_API_KEY: process.env.XAI_API_KEY!,
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    GHL_API_KEY: process.env.GHL_API_KEY,
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
  }
}

export const env = validateEnv()
