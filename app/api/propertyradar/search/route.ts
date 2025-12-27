import { type NextRequest, NextResponse } from "next/server"

const PROPERTY_RADAR_API = "https://api.propertyradar.com/v1"
const PROPERTY_RADAR_TOKEN = process.env.PROPERTY_RADAR_API_TOKEN || "be6c8a7b9e535270e251e2a86e18b2f443204396"

// SaintSal AI Scoring Algorithm
function calculateSaintSalScore(property: any): {
  score: number
  classification: "hot" | "warm" | "cold" | "low_priority"
  breakdown: Record<string, number>
  maxOffer: number
  estimatedRepairs: number
  potentialProfit: number
  dealType: string
  aiNotes: string
} {
  let score = 0
  const breakdown: Record<string, number> = {}

  // Equity Analysis (0-25 points)
  const equityPercent = property.EquityPercent || property.equityPercent || 0
  if (equityPercent >= 50) {
    breakdown.equity = 25
    score += 25
  } else if (equityPercent >= 30) {
    breakdown.equity = 20
    score += 20
  } else if (equityPercent >= 20) {
    breakdown.equity = 15
    score += 15
  } else {
    breakdown.equity = 5
    score += 5
  }

  // Distress Indicators (0-30 points)
  let distressScore = 0
  if (property.ForeclosureStatus || property.isForeclosure) {
    distressScore += 10
  }
  if (property.TaxDefaultStatus || property.isTaxDelinquent) {
    distressScore += 8
  }
  if (property.Vacant || property.isVacant) {
    distressScore += 6
  }
  if (property.ProbateFiling || property.isInherited) {
    distressScore += 6
  }
  if (property.AbsenteeOwner || property.isAbsenteeOwner) {
    distressScore += 4
  }
  breakdown.distress = Math.min(distressScore, 30)
  score += breakdown.distress

  // Ownership Duration (0-15 points)
  const yearsOwned = property.YearsOwned || property.yearsOwned || 0
  if (yearsOwned >= 15) {
    breakdown.ownership = 15
    score += 15
  } else if (yearsOwned >= 10) {
    breakdown.ownership = 12
    score += 12
  } else if (yearsOwned >= 5) {
    breakdown.ownership = 8
    score += 8
  } else {
    breakdown.ownership = 3
    score += 3
  }

  // Property Condition Indicators (0-15 points)
  const yearBuilt = property.YearBuilt || property.yearBuilt || 2000
  const propertyAge = new Date().getFullYear() - yearBuilt
  if (propertyAge >= 40) {
    breakdown.condition = 15
    score += 15
  } else if (propertyAge >= 25) {
    breakdown.condition = 10
    score += 10
  } else if (propertyAge >= 15) {
    breakdown.condition = 6
    score += 6
  } else {
    breakdown.condition = 3
    score += 3
  }

  // Market Value & Deal Size (0-15 points)
  const estimatedValue = property.AVM || property.EstimatedValue || property.estimatedValue || 0
  if (estimatedValue >= 200000 && estimatedValue <= 600000) {
    breakdown.dealSize = 15 // Sweet spot
    score += 15
  } else if (estimatedValue >= 100000 && estimatedValue < 200000) {
    breakdown.dealSize = 12
    score += 12
  } else if (estimatedValue > 600000 && estimatedValue <= 1000000) {
    breakdown.dealSize = 10
    score += 10
  } else {
    breakdown.dealSize = 5
    score += 5
  }

  // Calculate financials
  const arvMultiplier = 0.7 // 70% rule
  const estimatedRepairs =
    propertyAge >= 30 ? estimatedValue * 0.15 : propertyAge >= 20 ? estimatedValue * 0.1 : estimatedValue * 0.05
  const maxOffer = estimatedValue * arvMultiplier - estimatedRepairs - estimatedValue * 0.1 // Minus 10% for profit
  const potentialProfit = estimatedValue - maxOffer - estimatedRepairs

  // Determine deal type
  let dealType = "Wholesale"
  if (property.ForeclosureStatus) {
    dealType = "Pre-Foreclosure Rescue"
  } else if (equityPercent >= 40 && property.AbsenteeOwner) {
    dealType = "Subject-To"
  } else if (estimatedRepairs > estimatedValue * 0.12) {
    dealType = "Fix & Flip"
  }

  // Classification
  let classification: "hot" | "warm" | "cold" | "low_priority" = "low_priority"
  if (score >= 80) classification = "hot"
  else if (score >= 60) classification = "warm"
  else if (score >= 40) classification = "cold"

  // AI Notes
  const notes: string[] = []
  if (breakdown.equity >= 20) notes.push("High equity position")
  if (breakdown.distress >= 15) notes.push("Multiple distress indicators")
  if (yearsOwned >= 10) notes.push("Long-term owner likely motivated")
  if (property.Vacant) notes.push("Vacant property - higher motivation")
  if (property.ForeclosureStatus) notes.push("URGENT: Active foreclosure")

  return {
    score: Math.min(score, 100),
    classification,
    breakdown,
    maxOffer: Math.round(maxOffer),
    estimatedRepairs: Math.round(estimatedRepairs),
    potentialProfit: Math.round(potentialProfit),
    dealType,
    aiNotes: notes.join(". ") || "Standard opportunity - follow up recommended",
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      zipCodes,
      cities,
      counties,
      states,
      propertyTypes,
      minEquity,
      maxEquity,
      minValue,
      maxValue,
      foreclosure,
      taxDelinquent,
      vacant,
      absenteeOwner,
      minYearsOwned,
      limit = 50,
      fields,
    } = body

    // Build PropertyRadar criteria
    const criteria: any[] = []

    // Location criteria
    if (zipCodes?.length) {
      criteria.push({ name: "ZipFive", value: zipCodes })
    }
    if (cities?.length) {
      criteria.push({ name: "City", value: cities })
    }
    if (counties?.length) {
      criteria.push({ name: "County", value: counties })
    }
    if (states?.length) {
      criteria.push({ name: "State", value: states })
    }

    // Property type
    if (propertyTypes?.length) {
      criteria.push({
        name: "PropertyType",
        value: [{ name: "PType", value: propertyTypes }],
      })
    }

    // Equity range
    if (minEquity !== undefined || maxEquity !== undefined) {
      criteria.push({
        name: "AvailableEquity",
        value: [[minEquity || 0, maxEquity || null]],
      })
    }

    // Value range
    if (minValue !== undefined || maxValue !== undefined) {
      criteria.push({
        name: "AVM",
        value: [[minValue || 0, maxValue || null]],
      })
    }

    // Distress filters
    if (foreclosure) {
      criteria.push({ name: "ForeclosureStatus", value: ["Active"] })
    }
    if (taxDelinquent) {
      criteria.push({ name: "TaxDefaultStatus", value: ["Delinquent"] })
    }
    if (vacant) {
      criteria.push({ name: "Vacant", value: [1] })
    }
    if (absenteeOwner) {
      criteria.push({ name: "AbsenteeOwner", value: [1] })
    }

    // Years owned
    if (minYearsOwned) {
      criteria.push({
        name: "YearsOwned",
        value: [[minYearsOwned, null]],
      })
    }

    // Default fields to return
    const requestFields = fields || [
      "RadarID",
      "SitusFullAddress",
      "SitusCity",
      "SitusState",
      "SitusZip",
      "County",
      "PropertyType",
      "Bedrooms",
      "Bathrooms",
      "BuildingSqFt",
      "LotSizeSqFt",
      "YearBuilt",
      "AVM",
      "AssessedValue",
      "TotalLoanBalance",
      "AvailableEquity",
      "EquityPercent",
      "YearsOwned",
      "OwnerNames",
      "OwnerMailingAddress",
      "AbsenteeOwner",
      "Vacant",
      "ForeclosureStatus",
      "TaxDefaultStatus",
      "TaxDefaultAmount",
      "ProbateFiling",
    ]

    // Make PropertyRadar API request
    const response = await fetch(`${PROPERTY_RADAR_API}/properties`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PROPERTY_RADAR_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Criteria: criteria,
        Fields: requestFields,
        Limit: limit,
        Start: 0,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("PropertyRadar API error:", errorText)
      return NextResponse.json({ error: "PropertyRadar API error", details: errorText }, { status: response.status })
    }

    const data = await response.json()

    // Process each property with SaintSal AI scoring
    const processedProperties = (data.results || data || []).map((property: any) => {
      const analysis = calculateSaintSalScore(property)

      return {
        id: property.RadarID,
        address: property.SitusFullAddress,
        city: property.SitusCity,
        state: property.SitusState,
        zip: property.SitusZip,
        county: property.County,
        propertyType: property.PropertyType,
        bedrooms: property.Bedrooms,
        bathrooms: property.Bathrooms,
        squareFootage: property.BuildingSqFt,
        lotSize: property.LotSizeSqFt,
        yearBuilt: property.YearBuilt,
        estimatedValue: property.AVM,
        assessedValue: property.AssessedValue,
        loanBalance: property.TotalLoanBalance,
        equityAmount: property.AvailableEquity,
        equityPercent: property.EquityPercent,
        yearsOwned: property.YearsOwned,
        ownerName: property.OwnerNames,
        mailingAddress: property.OwnerMailingAddress,
        isAbsenteeOwner: property.AbsenteeOwner === 1,
        isVacant: property.Vacant === 1,
        foreclosureStatus: property.ForeclosureStatus,
        taxDelinquentStatus: property.TaxDefaultStatus,
        taxDelinquentAmount: property.TaxDefaultAmount,
        isProbate: !!property.ProbateFiling,
        // SaintSal AI Analysis
        saintSalScore: analysis.score,
        classification: analysis.classification,
        scoreBreakdown: analysis.breakdown,
        maxOffer: analysis.maxOffer,
        estimatedRepairs: analysis.estimatedRepairs,
        potentialProfit: analysis.potentialProfit,
        dealType: analysis.dealType,
        aiNotes: analysis.aiNotes,
        raw: property,
      }
    })

    // Sort by SaintSal score
    processedProperties.sort((a: any, b: any) => b.saintSalScore - a.saintSalScore)

    return NextResponse.json({
      success: true,
      count: processedProperties.length,
      properties: processedProperties,
      criteria: criteria,
    })
  } catch (error: any) {
    console.error("PropertyRadar search error:", error)
    return NextResponse.json({ error: "Failed to search properties", message: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const radarId = searchParams.get("id")

  if (!radarId) {
    return NextResponse.json({ error: "Property ID required" }, { status: 400 })
  }

  try {
    // Get single property by RadarID
    const response = await fetch(`${PROPERTY_RADAR_API}/properties/${radarId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PROPERTY_RADAR_TOKEN}`,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: "PropertyRadar API error", details: errorText }, { status: response.status })
    }

    const property = await response.json()
    const analysis = calculateSaintSalScore(property)

    return NextResponse.json({
      success: true,
      property: {
        ...property,
        saintSalScore: analysis.score,
        classification: analysis.classification,
        scoreBreakdown: analysis.breakdown,
        maxOffer: analysis.maxOffer,
        estimatedRepairs: analysis.estimatedRepairs,
        potentialProfit: analysis.potentialProfit,
        dealType: analysis.dealType,
        aiNotes: analysis.aiNotes,
      },
    })
  } catch (error: any) {
    console.error("PropertyRadar get error:", error)
    return NextResponse.json({ error: "Failed to get property", message: error.message }, { status: 500 })
  }
}
