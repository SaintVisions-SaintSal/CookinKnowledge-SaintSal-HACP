import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const classification = searchParams.get("classification")
    const minScore = searchParams.get("minScore")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("property_radar_leads")
      .select("*", { count: "exact" })
      .order("saintsal_score", { ascending: false })
      .order("received_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) query = query.eq("status", status)
    if (classification) query = query.eq("deal_classification", classification)
    if (minScore) query = query.gte("saintsal_score", Number.parseInt(minScore))

    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      leads: data,
      total: count,
      limit,
      offset,
    })
  } catch (error: any) {
    console.error("[v0] Error fetching leads:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Lead ID required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("property_radar_leads")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    // Log activity if status changed
    if (updates.status) {
      await supabase.from("property_radar_activity").insert({
        lead_id: id,
        activity_type: "status_change",
        description: `Status changed to ${updates.status}`,
        created_by: "system",
      })
    }

    return NextResponse.json({ success: true, lead: data })
  } catch (error: any) {
    console.error("[v0] Error updating lead:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
