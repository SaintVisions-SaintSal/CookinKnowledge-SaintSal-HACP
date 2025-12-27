import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const { data, error } = await supabase
      .from("property_radar_activity")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ activities: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { activity_type, description, outcome } = await request.json()

    const { data, error } = await supabase
      .from("property_radar_activity")
      .insert({
        lead_id: id,
        activity_type,
        description,
        outcome,
        created_by: "user",
      })
      .select()
      .single()

    if (error) throw error

    // Update last_contacted_at if it's a contact activity
    if (["call", "sms", "email", "visit"].includes(activity_type)) {
      await supabase.from("property_radar_leads").update({ last_contacted_at: new Date().toISOString() }).eq("id", id)
    }

    return NextResponse.json({ success: true, activity: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
