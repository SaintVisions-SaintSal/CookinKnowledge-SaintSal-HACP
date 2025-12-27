import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const WEBHOOK_SECRET = "cookinflips_pr_webhook_2025"

// SaintSal AI Scoring Algorithm for Real Estate Deals
function calculateSaintSalScore(property: any): {
  score: number
  breakdown: Record<string, number>
  classification: "hot" | "warm" | "cold" | "low_priority"
  maxOffer: number
  estimatedRepairs: number
  potentialProfit: number
  dealType: string
  aiNotes: string
} {
  let score = 0
  const breakdown: Record<string, number> = {}

  // 1. Equity Analysis (0-25 points)
  const equityPercent = property.equity_percent || 0
  if (equityPercent >= 50) {
    breakdown.equity = 25
  } else if (equityPercent >= 40) {
    breakdown.equity = 20
  } else if (equityPercent >= 30) {
    breakdown.equity = 15
  } else if (equityPercent >= 20) {
    breakdown.equity = 10
  } else {
    breakdown.equity = 5
  }
  score += breakdown.equity

  // 2. Distress Indicators (0-30 points)
  breakdown.distress = 0
  if (property.is_foreclosure) breakdown.distress += 10
  if (property.is_tax_delinquent) breakdown.distress += 8
  if (property.is_vacant) breakdown.distress += 6
  if (property.is_inherited) breakdown.distress += 4
  if (property.is_absentee_owner) breakdown.distress += 2
  breakdown.distress = Math.min(breakdown.distress, 30)
  score += breakdown.distress

  // 3. Years Owned / Motivation (0-15 points)
  const yearsOwned = property.years_owned || 0
  if (yearsOwned >= 20) {
    breakdown.ownership = 15
  } else if (yearsOwned >= 15) {
    breakdown.ownership = 12
  } else if (yearsOwned >= 10) {
    breakdown.ownership = 9
  } else if (yearsOwned >= 5) {
    breakdown.ownership = 6
  } else {
    breakdown.ownership = 3
  }
  score += breakdown.ownership

  // 4. Property Condition Estimate (0-15 points)
  const yearBuilt = property.year_built || 2000
  const age = new Date().getFullYear() - yearBuilt
  if (age >= 50) {
    breakdown.condition = 15
  } else if (age >= 40) {
    breakdown.condition = 12
  } else if (age >= 30) {
    breakdown.condition = 9
  } else if (age >= 20) {
    breakdown.condition = 6
  } else {
    breakdown.condition = 3
  }
  score += breakdown.condition

  // 5. Deal Size / Value (0-15 points)
  const value = property.estimated_value || 0
  if (value >= 100000 && value <= 500000) {
    breakdown.dealSize = 15 // Sweet spot
  } else if (value >= 500000 && value <= 1000000) {
    breakdown.dealSize = 12
  } else if (value >= 50000 && value < 100000) {
    breakdown.dealSize = 10
  } else if (value > 1000000) {
    breakdown.dealSize = 8
  } else {
    breakdown.dealSize = 5
  }
  score += breakdown.dealSize

  // Classification
  let classification: "hot" | "warm" | "cold" | "low_priority"
  if (score >= 80) {
    classification = "hot"
  } else if (score >= 60) {
    classification = "warm"
  } else if (score >= 40) {
    classification = "cold"
  } else {
    classification = "low_priority"
  }

  // Calculate financials
  const estimatedValue = property.estimated_value || 0
  const arv = estimatedValue * 1.15 // Assume 15% ARV increase potential
  const estimatedRepairs = age > 30 ? estimatedValue * 0.15 : estimatedValue * 0.08
  const maxOffer = arv * 0.7 - estimatedRepairs // 70% rule
  const potentialProfit = arv - maxOffer - estimatedRepairs - arv * 0.08 // 8% closing/holding

  // Deal type recommendation
  let dealType = "Wholesale"
  if (potentialProfit > 50000 && estimatedRepairs < 30000) {
    dealType = "Fix & Flip"
  } else if (equityPercent > 40 && property.is_absentee_owner) {
    dealType = "Subject-To"
  } else if (property.is_foreclosure) {
    dealType = "Pre-Foreclosure Rescue"
  }

  // AI Notes
  const notes: string[] = []
  if (score >= 80) notes.push("HIGH PRIORITY - Contact immediately!")
  if (property.is_foreclosure) notes.push(`Foreclosure stage: ${property.foreclosure_stage || "Unknown"}`)
  if (property.is_tax_delinquent)
    notes.push(`Tax delinquent: $${property.tax_delinquent_amount?.toLocaleString() || "Unknown"}`)
  if (equityPercent >= 50) notes.push(`Strong equity position: ${equityPercent}%`)
  if (yearsOwned >= 15) notes.push(`Long-term owner (${yearsOwned} years) - likely motivated`)
  if (property.is_vacant) notes.push("Property is VACANT - highly motivated seller")
  notes.push(`Recommended strategy: ${dealType}`)
  notes.push(`Max offer: $${maxOffer.toLocaleString()} | Potential profit: $${potentialProfit.toLocaleString()}`)

  return {
    score,
    breakdown,
    classification,
    maxOffer: Math.round(maxOffer),
    estimatedRepairs: Math.round(estimatedRepairs),
    potentialProfit: Math.round(potentialProfit),
    dealType,
    aiNotes: notes.join("\n"),
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get("authorization") || request.headers.get("x-webhook-secret")
    if (authHeader !== WEBHOOK_SECRET && authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
      console.log("[v0] Webhook secret mismatch")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await request.json()
    console.log("[v0] PropertyRadar webhook received:", JSON.stringify(payload).slice(0, 500))

    // Handle different payload formats from PropertyRadar
    const properties = Array.isArray(payload) ? payload : payload.properties || payload.records || [payload]

    const results = []

    for (const prop of properties) {
      // Map PropertyRadar fields to our schema
      const propertyData = {
        property_radar_id: prop.RadarID || prop.id || prop.property_id,
        address: prop.SitusFullStreetAddress || prop.address || prop.street_address || "Unknown",
        city: prop.SitusCity || prop.city,
        state: prop.SitusState || prop.state,
        zip: prop.SitusZIP || prop.zip || prop.postal_code,
        county: prop.County || prop.county,
        property_type: prop.PropertyType || prop.property_type || "Single Family",

        // Valuation
        estimated_value: Number.parseFloat(prop.EstimatedValue || prop.estimated_value || prop.AVM || 0),
        assessed_value: Number.parseFloat(prop.AssessedValue || prop.assessed_value || 0),
        loan_balance: Number.parseFloat(prop.TotalLoanBalance || prop.loan_balance || 0),
        equity_amount: Number.parseFloat(prop.EstimatedEquity || prop.equity || 0),
        equity_percent: Number.parseFloat(prop.EquityPercent || prop.equity_percent || 0),

        // Details
        bedrooms: Number.parseInt(prop.Bedrooms || prop.bedrooms || 0),
        bathrooms: Number.parseFloat(prop.Bathrooms || prop.bathrooms || 0),
        square_footage: Number.parseInt(prop.LivingArea || prop.square_footage || prop.sqft || 0),
        lot_size: Number.parseInt(prop.LotSize || prop.lot_size || 0),
        year_built: Number.parseInt(prop.YearBuilt || prop.year_built || 2000),

        // Distress
        is_foreclosure:
          prop.InForeclosure === "Yes" || prop.is_foreclosure === true || prop.foreclosure_status === "active",
        foreclosure_stage: prop.ForeclosureStage || prop.foreclosure_stage,
        is_tax_delinquent: prop.TaxDelinquent === "Yes" || prop.is_tax_delinquent === true,
        tax_delinquent_amount: Number.parseFloat(prop.TaxDelinquentAmount || prop.tax_delinquent_amount || 0),
        is_vacant: prop.Vacant === "Yes" || prop.is_vacant === true,
        is_inherited: prop.Inherited === "Yes" || prop.is_inherited === true || prop.owner_type === "inherited",
        is_absentee_owner: prop.AbsenteeOwner === "Yes" || prop.is_absentee === true || prop.owner_occupied === false,
        years_owned: Number.parseInt(prop.YearsOwned || prop.years_owned || 0),

        // Owner
        owner_name: prop.OwnerName || prop.owner_name || prop.owner_full_name,
        owner_phone: prop.OwnerPhone || prop.phone || prop.owner_phone,
        owner_email: prop.OwnerEmail || prop.email || prop.owner_email,
        mailing_address: prop.MailingFullAddress || prop.mailing_address,
      }

      // Calculate SaintSal AI Score
      const analysis = calculateSaintSalScore(propertyData)

      // Insert into database
      const { data, error } = await supabase
        .from("property_radar_leads")
        .upsert(
          {
            ...propertyData,
            saintsal_score: analysis.score,
            score_breakdown: analysis.breakdown,
            deal_classification: analysis.classification,
            max_offer: analysis.maxOffer,
            estimated_repairs: analysis.estimatedRepairs,
            potential_profit: analysis.potentialProfit,
            deal_type: analysis.dealType,
            ai_notes: analysis.aiNotes,
            status: "new",
            received_at: new Date().toISOString(),
          },
          {
            onConflict: "property_radar_id",
          },
        )
        .select()
        .single()

      if (error) {
        console.error("[v0] Error inserting lead:", error)
        results.push({ error: error.message, property: propertyData.address })
      } else {
        results.push({
          success: true,
          id: data.id,
          address: propertyData.address,
          score: analysis.score,
          classification: analysis.classification,
        })
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    })
  } catch (error: any) {
    console.error("[v0] PropertyRadar webhook error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET endpoint to verify webhook is active
export async function GET() {
  return NextResponse.json({
    status: "active",
    webhook: "PropertyRadar CookinFlips Deal Pipeline",
    endpoint: "/api/webhooks/propertyradar",
    features: [
      "SaintSal AI Scoring",
      "Automatic Deal Classification",
      "Max Offer Calculation",
      "Profit Potential Analysis",
      "Deal Type Recommendation",
    ],
  })
}
