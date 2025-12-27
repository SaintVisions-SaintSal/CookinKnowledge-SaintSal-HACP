import { type NextRequest, NextResponse } from "next/server"

const PROPERTY_RADAR_API = "https://api.propertyradar.com/v1"
const PROPERTY_RADAR_TOKEN = process.env.PROPERTY_RADAR_API_TOKEN || "be6c8a7b9e535270e251e2a86e18b2f443204396"

// Get user's PropertyRadar lists
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${PROPERTY_RADAR_API}/lists`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PROPERTY_RADAR_TOKEN}`,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: "Failed to fetch lists", details: errorText }, { status: response.status })
    }

    const lists = await response.json()
    return NextResponse.json({ success: true, lists })
  } catch (error: any) {
    console.error("PropertyRadar lists error:", error)
    return NextResponse.json({ error: "Failed to fetch lists", message: error.message }, { status: 500 })
  }
}

// Get properties from a specific list
export async function POST(request: NextRequest) {
  try {
    const { listId, limit = 100 } = await request.json()

    if (!listId) {
      return NextResponse.json({ error: "List ID required" }, { status: 400 })
    }

    const response = await fetch(`${PROPERTY_RADAR_API}/lists/${listId}/properties`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PROPERTY_RADAR_TOKEN}`,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: "Failed to fetch list properties", details: errorText },
        { status: response.status },
      )
    }

    const properties = await response.json()
    return NextResponse.json({ success: true, properties })
  } catch (error: any) {
    console.error("PropertyRadar list properties error:", error)
    return NextResponse.json({ error: "Failed to fetch list properties", message: error.message }, { status: 500 })
  }
}
