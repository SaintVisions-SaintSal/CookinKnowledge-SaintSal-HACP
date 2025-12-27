import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("service_consultations")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ consultation: data })
  } catch (error) {
    console.error("Update consultation error:", error)
    return NextResponse.json({ error: "Failed to update consultation" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const supabase = await createClient()

    const { data, error } = await supabase.from("service_consultations").select("*").eq("id", id).single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ consultation: data })
  } catch (error) {
    console.error("Get consultation error:", error)
    return NextResponse.json({ error: "Failed to fetch consultation" }, { status: 500 })
  }
}
