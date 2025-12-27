import { type NextRequest, NextResponse } from "next/server"

const RENTCAST_API_KEY = "609f6955bf37429e8611da12430915ab"

// SaintSal AI Scoring Algorithm
function calculateSaintSalScore(
  property: any,
  comparables: any[],
): { score: number; analysis: string; factors: any[] } {
  let score = 50 // Base score
  const factors: any[] = []

  // Price vs Comparables Analysis
  if (comparables.length > 0 && property.price) {
    const avgCompPrice = comparables.reduce((sum, c) => sum + (c.price || 0), 0) / comparables.length
    const propertyPrice = property.price

    if (propertyPrice < avgCompPrice * 0.85) {
      score += 20
      factors.push({ name: "Below Market Value", impact: "+20", detail: "Property priced 15%+ below comparables" })
    } else if (propertyPrice < avgCompPrice * 0.95) {
      score += 10
      factors.push({ name: "Competitive Pricing", impact: "+10", detail: "Property priced below market average" })
    } else if (propertyPrice > avgCompPrice * 1.1) {
      score -= 10
      factors.push({ name: "Above Market", impact: "-10", detail: "Property priced above comparables" })
    } else {
      score += 5
      factors.push({ name: "Fair Market Value", impact: "+5", detail: "Property priced at market rate" })
    }
  }

  // Property Condition Factors
  if (property.yearBuilt) {
    const age = new Date().getFullYear() - property.yearBuilt
    if (age < 5) {
      score += 15
      factors.push({ name: "New Construction", impact: "+15", detail: "Built within last 5 years" })
    } else if (age < 20) {
      score += 8
      factors.push({ name: "Modern Build", impact: "+8", detail: "Built within last 20 years" })
    } else if (age > 50) {
      score -= 5
      factors.push({ name: "Older Property", impact: "-5", detail: "May require updates" })
    }
  }

  // Size & Layout
  if (property.squareFootage > 2000) {
    score += 5
    factors.push({ name: "Spacious Layout", impact: "+5", detail: "2000+ sq ft" })
  }

  if (property.bedrooms >= 4) {
    score += 5
    factors.push({ name: "Family Friendly", impact: "+5", detail: "4+ bedrooms" })
  }

  // Lot Size
  if (property.lotSize && property.lotSize > 10000) {
    score += 8
    factors.push({ name: "Large Lot", impact: "+8", detail: "Over 10,000 sq ft lot" })
  }

  // Investment Potential - Price per sq ft
  if (property.price && property.squareFootage) {
    const pricePerSqFt = property.price / property.squareFootage
    if (pricePerSqFt < 150) {
      score += 10
      factors.push({
        name: "Strong Value",
        impact: "+10",
        detail: `$${pricePerSqFt.toFixed(0)}/sq ft - excellent value`,
      })
    } else if (pricePerSqFt < 250) {
      score += 5
      factors.push({ name: "Good Value", impact: "+5", detail: `$${pricePerSqFt.toFixed(0)}/sq ft` })
    }
  }

  // Price range confidence
  if (property.priceRangeLow && property.priceRangeHigh) {
    const range = property.priceRangeHigh - property.priceRangeLow
    const rangePercent = (range / property.price) * 100
    if (rangePercent < 10) {
      score += 5
      factors.push({
        name: "High Confidence",
        impact: "+5",
        detail: "Tight valuation range indicates reliable estimate",
      })
    }
  }

  // Cap score at 100
  score = Math.min(100, Math.max(0, score))

  // Generate analysis
  let analysis = ""
  if (score >= 85) {
    analysis =
      "Exceptional investment opportunity. This property shows strong fundamentals with pricing well below market comparables. SaintSal recommends immediate action."
  } else if (score >= 70) {
    analysis =
      "Strong potential. This property offers good value relative to the market. Consider for portfolio addition with standard due diligence."
  } else if (score >= 50) {
    analysis =
      "Average opportunity. Property is fairly priced but may not offer significant upside. Detailed analysis recommended before proceeding."
  } else {
    analysis =
      "Caution advised. Property may be overpriced or have factors requiring additional investigation. Recommend deeper market analysis."
  }

  return { score, analysis, factors }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { street, city, state, zipCode, propertyType, bedrooms, bathrooms, squareFootage } = body

    if (!street && !zipCode) {
      return NextResponse.json({ error: "Street address or ZIP code required" }, { status: 400 })
    }

    // Build the full address for the AVM endpoint
    const addressParts = [street, city, state, zipCode].filter(Boolean)
    const fullAddress = addressParts.join(", ")

    // Build AVM API URL with all parameters
    const params = new URLSearchParams()
    params.append("address", fullAddress)
    if (propertyType) params.append("propertyType", propertyType)
    if (bedrooms) params.append("bedrooms", bedrooms.toString())
    if (bathrooms) params.append("bathrooms", bathrooms.toString())
    if (squareFootage) params.append("squareFootage", squareFootage.toString())
    params.append("compCount", "5")

    const apiUrl = `https://api.rentcast.io/v1/avm/value?${params.toString()}`

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": RENTCAST_API_KEY,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("RentCast API error:", response.status, errorText)
      return NextResponse.json(
        {
          error: `Property lookup failed: ${response.status}`,
          details: errorText,
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Format the property data
    const property = {
      address: fullAddress,
      street,
      city,
      state,
      zipCode,
      price: data.price,
      priceRangeLow: data.priceRangeLow,
      priceRangeHigh: data.priceRangeHigh,
      latitude: data.latitude,
      longitude: data.longitude,
      propertyType: propertyType || "Single Family",
      bedrooms: bedrooms || data.bedrooms,
      bathrooms: bathrooms || data.bathrooms,
      squareFootage: squareFootage || data.squareFootage,
      yearBuilt: data.yearBuilt,
      lotSize: data.lotSize,
    }

    // Format comparables
    const comparables = (data.comparables || []).map((comp: any) => ({
      address: comp.formattedAddress,
      city: comp.city,
      state: comp.state,
      zipCode: comp.zipCode,
      price: comp.price,
      bedrooms: comp.bedrooms,
      bathrooms: comp.bathrooms,
      squareFootage: comp.squareFootage,
      propertyType: comp.propertyType,
      yearBuilt: comp.yearBuilt,
      distance: comp.distance,
      correlation: comp.correlation,
    }))

    // Calculate SaintSal Score
    const saintSalAnalysis = calculateSaintSalScore(property, comparables)

    return NextResponse.json({
      property,
      comparables,
      saintSalScore: saintSalAnalysis.score,
      saintSalAnalysis: saintSalAnalysis.analysis,
      scoringFactors: saintSalAnalysis.factors,
      priceEstimate: {
        value: data.price,
        low: data.priceRangeLow,
        high: data.priceRangeHigh,
      },
      searchTimestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Property search error:", error)
    return NextResponse.json({ error: "Failed to search properties" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const zipCode = searchParams.get("zipCode")
  const city = searchParams.get("city")
  const state = searchParams.get("state")
  const propertyType = searchParams.get("propertyType")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const limit = searchParams.get("limit") || "20"

  try {
    const params = new URLSearchParams()
    if (zipCode) params.append("zipCode", zipCode)
    if (city) params.append("city", city)
    if (state) params.append("state", state)
    if (propertyType) params.append("propertyType", propertyType)
    if (minPrice) params.append("minPrice", minPrice)
    if (maxPrice) params.append("maxPrice", maxPrice)
    params.append("limit", limit)

    const res = await fetch(`https://api.rentcast.io/v1/listings/sale?${params.toString()}`, {
      headers: {
        "X-Api-Key": RENTCAST_API_KEY,
        Accept: "application/json",
      },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch listings")
    }

    let listings = await res.json()
    if (!Array.isArray(listings)) {
      listings = listings.listings || []
    }

    // Add SaintSal scores to each listing
    const scoredListings = listings.map((listing: any) => {
      const { score, analysis } = calculateSaintSalScore(listing, listings)
      return {
        ...listing,
        saintSalScore: score,
        saintSalQuickAnalysis: analysis,
      }
    })

    // Sort by SaintSal score
    scoredListings.sort((a: any, b: any) => b.saintSalScore - a.saintSalScore)

    return NextResponse.json({
      listings: scoredListings,
      total: scoredListings.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Listings fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 })
  }
}
