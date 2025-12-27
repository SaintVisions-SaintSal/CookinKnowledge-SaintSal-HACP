"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Home,
  DollarSign,
  Sparkles,
  Target,
  Building,
  ArrowRight,
  AlertTriangle,
  BarChart3,
  MapPin,
  User,
  Flame,
  Snowflake,
  ThermometerSun,
  Filter,
  RefreshCw,
  AlertCircle,
  Clock,
  Banknote,
  PiggyBank,
  Percent,
  FileWarning,
  HomeIcon,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface PropertyResult {
  id: string
  address: string
  city: string
  state: string
  zip: string
  county: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  squareFootage: number
  lotSize: number
  yearBuilt: number
  estimatedValue: number
  assessedValue: number
  loanBalance: number
  equityAmount: number
  equityPercent: number
  yearsOwned: number
  ownerName: string
  mailingAddress: string
  isAbsenteeOwner: boolean
  isVacant: boolean
  foreclosureStatus: string | null
  taxDelinquentStatus: string | null
  taxDelinquentAmount: number
  isProbate: boolean
  saintSalScore: number
  classification: "hot" | "warm" | "cold" | "low_priority"
  scoreBreakdown: Record<string, number>
  maxOffer: number
  estimatedRepairs: number
  potentialProfit: number
  dealType: string
  aiNotes: string
}

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState("search")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<PropertyResult[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<PropertyResult | null>(null)

  // Search filters
  const [zipCodes, setZipCodes] = useState("")
  const [cities, setCities] = useState("")
  const [states, setStates] = useState("CA")
  const [propertyTypes, setPropertyTypes] = useState<string[]>(["SFR"])
  const [minEquity, setMinEquity] = useState<number>(50000)
  const [maxValue, setMaxValue] = useState<number>(1000000)
  const [minValue, setMinValue] = useState<number>(100000)
  const [foreclosure, setForeclosure] = useState(false)
  const [taxDelinquent, setTaxDelinquent] = useState(false)
  const [vacant, setVacant] = useState(false)
  const [absenteeOwner, setAbsenteeOwner] = useState(false)
  const [minYearsOwned, setMinYearsOwned] = useState<number>(5)

  const handleSearch = async () => {
    setIsSearching(true)
    setSearchError(null)
    setResults([])

    try {
      const res = await fetch("/api/propertyradar/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zipCodes: zipCodes ? zipCodes.split(",").map((z) => z.trim()) : undefined,
          cities: cities ? cities.split(",").map((c) => c.trim()) : undefined,
          states: states ? [states] : undefined,
          propertyTypes,
          minEquity,
          minValue,
          maxValue,
          foreclosure,
          taxDelinquent,
          vacant,
          absenteeOwner,
          minYearsOwned,
          limit: 50,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setSearchError(data.error || "Failed to search properties")
        return
      }

      setResults(data.properties || [])
      if (data.properties?.length > 0) {
        setActiveTab("results")
      }
    } catch (error) {
      console.error("Search error:", error)
      setSearchError("An error occurred while searching. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "hot":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warm":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "cold":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case "hot":
        return <Flame className="w-4 h-4" />
      case "warm":
        return <ThermometerSun className="w-4 h-4" />
      case "cold":
        return <Snowflake className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const formatPrice = (price: number) => {
    if (!price) return "N/A"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    if (!num) return "N/A"
    return new Intl.NumberFormat("en-US").format(num)
  }

  // Stats
  const hotLeads = results.filter((r) => r.classification === "hot").length
  const warmLeads = results.filter((r) => r.classification === "warm").length
  const totalProfit = results.reduce((sum, r) => sum + (r.potentialProfit || 0), 0)
  const avgScore =
    results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.saintSalScore, 0) / results.length) : 0

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <section className="relative py-12 overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-red-500/20 to-amber-500/20 text-amber-400 border-amber-500/30 px-4 py-1">
              <Sparkles className="w-3 h-3 mr-2" />
              PropertyRadar + SaintSal AI
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-amber-400">Real</span> Property Intelligence
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Search 150M+ properties with real-time distress data, equity analysis, and SaintSal AI scoring. Find
              motivated sellers and investment opportunities instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 bg-zinc-900/50 border border-amber-500/20 p-1">
              <TabsTrigger value="search" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <Search className="w-4 h-4 mr-2" />
                Search
              </TabsTrigger>
              <TabsTrigger value="results" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <BarChart3 className="w-4 h-4 mr-2" />
                Results ({results.length})
              </TabsTrigger>
              <TabsTrigger
                value="borrowers"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
              >
                <Banknote className="w-4 h-4 mr-2" />
                For Borrowers
              </TabsTrigger>
              <TabsTrigger
                value="investors"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
              >
                <PiggyBank className="w-4 h-4 mr-2" />
                For Investors
              </TabsTrigger>
            </TabsList>

            {/* Search Tab */}
            <TabsContent value="search" className="space-y-6">
              <Card className="bg-zinc-900/80 border-amber-500/20 shadow-lg shadow-amber-500/5">
                <CardHeader className="border-b border-amber-500/10">
                  <CardTitle className="flex items-center gap-2 text-amber-400">
                    <Filter className="w-5 h-5" />
                    PropertyRadar Search Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Location Filters */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-amber-400 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        ZIP Codes (comma separated)
                      </Label>
                      <Input
                        placeholder="90210, 90211, 90212"
                        value={zipCodes}
                        onChange={(e) => setZipCodes(e.target.value)}
                        className="bg-zinc-800 border-amber-500/30 focus:border-amber-500 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-amber-400 flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Cities (comma separated)
                      </Label>
                      <Input
                        placeholder="Los Angeles, Beverly Hills"
                        value={cities}
                        onChange={(e) => setCities(e.target.value)}
                        className="bg-zinc-800 border-amber-500/30 focus:border-amber-500 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-amber-400">State</Label>
                      <Select value={states} onValueChange={setStates}>
                        <SelectTrigger className="bg-zinc-800 border-amber-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-amber-500/30">
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="NV">Nevada</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="WA">Washington</SelectItem>
                          <SelectItem value="OR">Oregon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Value & Equity Filters */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="text-amber-400 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Property Value Range: {formatPrice(minValue)} - {formatPrice(maxValue)}
                      </Label>
                      <div className="px-2">
                        <Slider
                          value={[minValue, maxValue]}
                          onValueChange={([min, max]) => {
                            setMinValue(min)
                            setMaxValue(max)
                          }}
                          min={50000}
                          max={2000000}
                          step={25000}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label className="text-amber-400 flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        Minimum Equity: {formatPrice(minEquity)}
                      </Label>
                      <div className="px-2">
                        <Slider
                          value={[minEquity]}
                          onValueChange={([val]) => setMinEquity(val)}
                          min={0}
                          max={500000}
                          step={10000}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-3">
                    <Label className="text-amber-400">Property Types</Label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "SFR", label: "Single Family" },
                        { value: "MFR", label: "Multi-Family" },
                        { value: "CND", label: "Condo" },
                        { value: "TWN", label: "Townhouse" },
                        { value: "MH", label: "Mobile Home" },
                      ].map((type) => (
                        <label
                          key={type.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                            propertyTypes.includes(type.value)
                              ? "bg-amber-500/20 border-amber-500 text-amber-400"
                              : "bg-zinc-800 border-zinc-700 text-gray-400 hover:border-amber-500/50"
                          }`}
                        >
                          <Checkbox
                            checked={propertyTypes.includes(type.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setPropertyTypes([...propertyTypes, type.value])
                              } else {
                                setPropertyTypes(propertyTypes.filter((t) => t !== type.value))
                              }
                            }}
                            className="border-amber-500/50"
                          />
                          {type.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Distress Indicators */}
                  <div className="space-y-3">
                    <Label className="text-amber-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Distress Indicators (Motivated Sellers)
                    </Label>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                      <label
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          foreclosure
                            ? "bg-red-500/20 border-red-500 text-red-400"
                            : "bg-zinc-800 border-zinc-700 text-gray-400 hover:border-red-500/50"
                        }`}
                      >
                        <Checkbox
                          checked={foreclosure}
                          onCheckedChange={(checked) => setForeclosure(!!checked)}
                          className="border-red-500/50"
                        />
                        <div>
                          <div className="font-medium">Foreclosure</div>
                          <div className="text-xs opacity-70">Active foreclosures</div>
                        </div>
                      </label>
                      <label
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          taxDelinquent
                            ? "bg-orange-500/20 border-orange-500 text-orange-400"
                            : "bg-zinc-800 border-zinc-700 text-gray-400 hover:border-orange-500/50"
                        }`}
                      >
                        <Checkbox
                          checked={taxDelinquent}
                          onCheckedChange={(checked) => setTaxDelinquent(!!checked)}
                          className="border-orange-500/50"
                        />
                        <div>
                          <div className="font-medium">Tax Delinquent</div>
                          <div className="text-xs opacity-70">Behind on taxes</div>
                        </div>
                      </label>
                      <label
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          vacant
                            ? "bg-purple-500/20 border-purple-500 text-purple-400"
                            : "bg-zinc-800 border-zinc-700 text-gray-400 hover:border-purple-500/50"
                        }`}
                      >
                        <Checkbox
                          checked={vacant}
                          onCheckedChange={(checked) => setVacant(!!checked)}
                          className="border-purple-500/50"
                        />
                        <div>
                          <div className="font-medium">Vacant</div>
                          <div className="text-xs opacity-70">Unoccupied properties</div>
                        </div>
                      </label>
                      <label
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          absenteeOwner
                            ? "bg-blue-500/20 border-blue-500 text-blue-400"
                            : "bg-zinc-800 border-zinc-700 text-gray-400 hover:border-blue-500/50"
                        }`}
                      >
                        <Checkbox
                          checked={absenteeOwner}
                          onCheckedChange={(checked) => setAbsenteeOwner(!!checked)}
                          className="border-blue-500/50"
                        />
                        <div>
                          <div className="font-medium">Absentee Owner</div>
                          <div className="text-xs opacity-70">Owner lives elsewhere</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Years Owned */}
                  <div className="space-y-4">
                    <Label className="text-amber-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Minimum Years Owned: {minYearsOwned}+ years
                    </Label>
                    <div className="px-2">
                      <Slider
                        value={[minYearsOwned]}
                        onValueChange={([val]) => setMinYearsOwned(val)}
                        min={0}
                        max={30}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {searchError && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4" />
                      {searchError}
                    </div>
                  )}

                  {/* Search Button */}
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full h-14 text-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold"
                  >
                    {isSearching ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                        Searching PropertyRadar with SaintSal AI...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-3" />
                        Search Properties
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              {/* Stats Bar */}
              {results.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Card className="bg-zinc-900/80 border-amber-500/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-white">{results.length}</div>
                      <div className="text-xs text-gray-400">Properties Found</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-500/10 border-red-500/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-400">{hotLeads}</div>
                      <div className="text-xs text-gray-400">Hot Leads</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-amber-500/10 border-amber-500/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-amber-400">{warmLeads}</div>
                      <div className="text-xs text-gray-400">Warm Leads</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-zinc-900/80 border-amber-500/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-white">{avgScore}</div>
                      <div className="text-xs text-gray-400">Avg Score</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-500/10 border-green-500/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">{formatPrice(totalProfit)}</div>
                      <div className="text-xs text-gray-400">Total Potential</div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Results Grid */}
              {results.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((property) => (
                    <Card
                      key={property.id}
                      className={`bg-zinc-900/80 border-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer ${
                        selectedProperty?.id === property.id ? "ring-2 ring-amber-500" : ""
                      }`}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <CardContent className="p-4 space-y-4">
                        {/* Header with Score */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={getClassificationColor(property.classification)}>
                                {getClassificationIcon(property.classification)}
                                <span className="ml-1 capitalize">{property.classification}</span>
                              </Badge>
                              <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                                {property.dealType}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-white line-clamp-1">{property.address}</h3>
                            <p className="text-sm text-gray-400">
                              {property.city}, {property.state} {property.zip}
                            </p>
                          </div>
                          <div
                            className={`text-center px-3 py-2 rounded-lg ${
                              property.saintSalScore >= 80
                                ? "bg-red-500/20 text-red-400"
                                : property.saintSalScore >= 60
                                  ? "bg-amber-500/20 text-amber-400"
                                  : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            <div className="text-2xl font-bold">{property.saintSalScore}</div>
                            <div className="text-xs">Score</div>
                          </div>
                        </div>

                        {/* Property Details */}
                        <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-zinc-800">
                          <div>
                            <div className="text-lg font-semibold text-white">{property.bedrooms || "-"}</div>
                            <div className="text-xs text-gray-500">Beds</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-white">{property.bathrooms || "-"}</div>
                            <div className="text-xs text-gray-500">Baths</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-white">
                              {property.squareFootage ? formatNumber(property.squareFootage) : "-"}
                            </div>
                            <div className="text-xs text-gray-500">Sq Ft</div>
                          </div>
                        </div>

                        {/* Value & Equity */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-zinc-800/50 rounded-lg p-2">
                            <div className="text-xs text-gray-400">Est. Value</div>
                            <div className="font-semibold text-white">{formatPrice(property.estimatedValue)}</div>
                          </div>
                          <div className="bg-green-500/10 rounded-lg p-2">
                            <div className="text-xs text-gray-400">Equity</div>
                            <div className="font-semibold text-green-400">
                              {formatPrice(property.equityAmount)} ({property.equityPercent}%)
                            </div>
                          </div>
                        </div>

                        {/* Distress Indicators */}
                        <div className="flex flex-wrap gap-1">
                          {property.foreclosureStatus && (
                            <Badge variant="outline" className="text-xs border-red-500/50 text-red-400 bg-red-500/10">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Foreclosure
                            </Badge>
                          )}
                          {property.taxDelinquentStatus && (
                            <Badge
                              variant="outline"
                              className="text-xs border-orange-500/50 text-orange-400 bg-orange-500/10"
                            >
                              <FileWarning className="w-3 h-3 mr-1" />
                              Tax Delinquent
                            </Badge>
                          )}
                          {property.isVacant && (
                            <Badge
                              variant="outline"
                              className="text-xs border-purple-500/50 text-purple-400 bg-purple-500/10"
                            >
                              <HomeIcon className="w-3 h-3 mr-1" />
                              Vacant
                            </Badge>
                          )}
                          {property.isAbsenteeOwner && (
                            <Badge
                              variant="outline"
                              className="text-xs border-blue-500/50 text-blue-400 bg-blue-500/10"
                            >
                              <Users className="w-3 h-3 mr-1" />
                              Absentee
                            </Badge>
                          )}
                          {property.yearsOwned >= 10 && (
                            <Badge
                              variant="outline"
                              className="text-xs border-amber-500/50 text-amber-400 bg-amber-500/10"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {property.yearsOwned}yr Owner
                            </Badge>
                          )}
                        </div>

                        {/* SaintSal Analysis */}
                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-2">
                            <Sparkles className="w-4 h-4" />
                            SaintSal AI Analysis
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center mb-2">
                            <div>
                              <div className="text-xs text-gray-400">Max Offer</div>
                              <div className="font-semibold text-green-400">{formatPrice(property.maxOffer)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">Repairs</div>
                              <div className="font-semibold text-orange-400">
                                {formatPrice(property.estimatedRepairs)}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">Profit</div>
                              <div className="font-semibold text-amber-400">
                                {formatPrice(property.potentialProfit)}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2">{property.aiNotes}</p>
                        </div>

                        {/* Owner Info (if available) */}
                        {property.ownerName && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <User className="w-4 h-4" />
                              <span className="line-clamp-1">{property.ownerName}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-amber-500/30 text-amber-400 h-7 text-xs bg-transparent"
                            >
                              Contact
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-zinc-900/50 border-amber-500/20">
                  <CardContent className="p-12 text-center">
                    <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No Results Yet</h3>
                    <p className="text-gray-500 mb-4">Use the search tab to find properties with PropertyRadar data</p>
                    <Button
                      onClick={() => setActiveTab("search")}
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      Start Searching
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Borrowers Tab */}
            <TabsContent value="borrowers" className="space-y-6">
              <Card className="bg-zinc-900/80 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <Banknote className="w-5 h-5" />
                    Need Financing for Your Deal?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-400">
                    CookinCapital provides fast, flexible financing for real estate investors. Whether you need a fix &
                    flip loan, bridge financing, or DSCR rental loans - we have you covered.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-zinc-800/50 border-amber-500/10">
                      <CardContent className="p-4 text-center">
                        <DollarSign className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                        <h4 className="font-semibold mb-1">Fix & Flip</h4>
                        <p className="text-sm text-gray-400">Up to 90% LTV, 100% rehab</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-zinc-800/50 border-amber-500/10">
                      <CardContent className="p-4 text-center">
                        <Building className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                        <h4 className="font-semibold mb-1">Bridge Loans</h4>
                        <p className="text-sm text-gray-400">Close in 7-10 days</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-zinc-800/50 border-amber-500/10">
                      <CardContent className="p-4 text-center">
                        <Home className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                        <h4 className="font-semibold mb-1">DSCR Rentals</h4>
                        <p className="text-sm text-gray-400">No income verification</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-4">
                    <Link href="/capital" className="flex-1">
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                        Apply for Financing
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button variant="outline" className="border-amber-500/30 text-amber-400 bg-transparent">
                        Talk to SaintSal
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Investors Tab */}
            <TabsContent value="investors" className="space-y-6">
              <Card className="bg-zinc-900/80 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <PiggyBank className="w-5 h-5" />
                    Invest in Real Estate Backed Loans
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-400">
                    Earn passive income by investing in real estate backed loans. Choose individual deals or let
                    CookinCapital manage a diversified portfolio for you.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-zinc-800/50 border-green-500/20">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-green-400 mb-1">8-12%</div>
                        <p className="text-sm text-gray-400">Annual Returns</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-zinc-800/50 border-amber-500/20">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-amber-400 mb-1">$50K</div>
                        <p className="text-sm text-gray-400">Minimum Investment</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-zinc-800/50 border-blue-500/20">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-1">100%</div>
                        <p className="text-sm text-gray-400">Collateralized</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-4">
                    <Link href="/capital" className="flex-1">
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                        Start Investing
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/apply?type=investor">
                      <Button variant="outline" className="border-amber-500/30 text-amber-400 bg-transparent">
                        Accredited Investor Form
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Selected Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-zinc-900 border-amber-500/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b border-amber-500/20 sticky top-0 bg-zinc-900 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className={`mb-2 ${getClassificationColor(selectedProperty.classification)}`}>
                    {getClassificationIcon(selectedProperty.classification)}
                    <span className="ml-1 capitalize">{selectedProperty.classification} Lead</span>
                  </Badge>
                  <CardTitle className="text-white">{selectedProperty.address}</CardTitle>
                  <p className="text-gray-400">
                    {selectedProperty.city}, {selectedProperty.state} {selectedProperty.zip}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProperty(null)}
                  className="text-gray-400 hover:text-white"
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Score Breakdown */}
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(selectedProperty.scoreBreakdown).map(([key, value]) => (
                  <div key={key} className="bg-zinc-800 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-amber-400">{value}</div>
                    <div className="text-xs text-gray-400 capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Bedrooms</div>
                  <div className="font-semibold">{selectedProperty.bedrooms || "N/A"}</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Bathrooms</div>
                  <div className="font-semibold">{selectedProperty.bathrooms || "N/A"}</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Sq Ft</div>
                  <div className="font-semibold">{formatNumber(selectedProperty.squareFootage)}</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Year Built</div>
                  <div className="font-semibold">{selectedProperty.yearBuilt || "N/A"}</div>
                </div>
              </div>

              {/* Financials */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Estimated Value</div>
                  <div className="font-semibold text-white">{formatPrice(selectedProperty.estimatedValue)}</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Loan Balance</div>
                  <div className="font-semibold text-red-400">{formatPrice(selectedProperty.loanBalance)}</div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Available Equity</div>
                  <div className="font-semibold text-green-400">
                    {formatPrice(selectedProperty.equityAmount)} ({selectedProperty.equityPercent}%)
                  </div>
                </div>
              </div>

              {/* SaintSal Deal Analysis */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <h4 className="text-amber-400 font-semibold flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" />
                  SaintSal AI Deal Analysis
                </h4>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Max Offer (70% Rule)</div>
                    <div className="text-xl font-bold text-green-400">{formatPrice(selectedProperty.maxOffer)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Est. Repairs</div>
                    <div className="text-xl font-bold text-orange-400">
                      {formatPrice(selectedProperty.estimatedRepairs)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Potential Profit</div>
                    <div className="text-xl font-bold text-amber-400">
                      {formatPrice(selectedProperty.potentialProfit)}
                    </div>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Recommended Strategy</div>
                  <div className="font-semibold text-amber-400">{selectedProperty.dealType}</div>
                  <p className="text-sm text-gray-400 mt-2">{selectedProperty.aiNotes}</p>
                </div>
              </div>

              {/* Owner Info */}
              {selectedProperty.ownerName && (
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    Owner Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{selectedProperty.ownerName}</span>
                    </div>
                    {selectedProperty.mailingAddress && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mailing Address:</span>
                        <span className="text-white">{selectedProperty.mailingAddress}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Years Owned:</span>
                      <span className="text-white">{selectedProperty.yearsOwned} years</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link href={`/capital?property=${encodeURIComponent(selectedProperty.address)}`} className="flex-1">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    <Banknote className="w-4 h-4 mr-2" />
                    Get Financing
                  </Button>
                </Link>
                <Link href={`/pipeline`}>
                  <Button variant="outline" className="border-amber-500/30 text-amber-400 bg-transparent">
                    <Target className="w-4 h-4 mr-2" />
                    Add to Pipeline
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-amber-500/30 text-amber-400 bg-transparent">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Ask SaintSal
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
