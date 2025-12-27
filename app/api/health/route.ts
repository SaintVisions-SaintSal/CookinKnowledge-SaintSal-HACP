import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const checks = {
      timestamp: new Date().toISOString(),
      status: "healthy",
      services: {
        database: "unknown",
        api: "healthy",
      },
    }

    // Check database connection
    try {
      const supabase = await createClient()
      const { error } = await supabase.from("profiles").select("count").limit(1).single()

      checks.services.database = error ? "unhealthy" : "healthy"
    } catch (err) {
      checks.services.database = "unhealthy"
    }

    const isHealthy = Object.values(checks.services).every((status) => status === "healthy")
    checks.status = isHealthy ? "healthy" : "degraded"

    return NextResponse.json(checks, {
      status: isHealthy ? 200 : 503,
    })
  } catch (error) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: "unhealthy",
        error: "Health check failed",
      },
      { status: 503 },
    )
  }
}
