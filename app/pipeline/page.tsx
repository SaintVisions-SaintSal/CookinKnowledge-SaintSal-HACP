"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Home,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  Flame,
  ThermometerSun,
  Snowflake,
  MessageSquare,
  Building,
  RefreshCw,
  Target,
  Zap,
} from "lucide-react"

interface Lead {
  id: string
  property_radar_id: string
  address: string
  city: string
  state: string
  zip: string
  county: string
  property_type: string
  estimated_value: number
  assessed_value: number
  loan_balance: number
  equity_amount: number
  equity_percent: number
  bedrooms: number
  bathrooms: number
  square_footage: number
  lot_size: number
  year_built: number
  is_foreclosure: boolean
  foreclosure_stage: string
  is_tax_delinquent: boolean
  tax_delinquent_amount: number
  is_vacant: boolean
  is_inherited: boolean
  is_absentee_owner: boolean
  years_owned: number
  owner_name: string
  owner_phone: string
  owner_email: string
  mailing_address: string
  saintsal_score: number
  score_breakdown: Record<string, number>
  deal_classification: "hot" | "warm" | "cold" | "low_priority"
  max_offer: number
  estimated_repairs: number
  potential_profit: number
  deal_type: string
  ai_notes: string
  status: string
  assigned_to: string
  received_at: string
  last_contacted_at: string
  created_at: string
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ status: "new", classification: "hot", minScore: "80" })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [activityNote, setActivityNote] = useState("")
  const [activityType, setActivityType] = useState("note")
  const [stats, setStats] = useState({ total: 0, hot: 0, warm: 0, cold: 0, totalProfit: 0 })

  useEffect(() => {
    fetchLeads()
  }, [filter])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter.status) params.append("status", filter.status)
      if (filter.classification) params.append("classification", filter.classification)
      if (filter.minScore) params.append("minScore", filter.minScore)
      params.append("limit", "100")

      const res = await fetch(`/api/leads?${params}`)
      const data = await res.json()

      if (data.leads) {
        setLeads(data.leads)
        // Calculate stats
        const hot = data.leads.filter((l: Lead) => l.deal_classification === "hot").length
        const warm = data.leads.filter((l: Lead) => l.deal_classification === "warm").length
        const cold = data.leads.filter((l: Lead) => l.deal_classification === "cold").length
        const totalProfit = data.leads.reduce((sum: number, l: Lead) => sum + (l.potential_profit || 0), 0)
        setStats({ total: data.total || data.leads.length, hot, warm, cold, totalProfit })
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
    }
    setLoading(false)
  }

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      fetchLeads()
    } catch (error) {
      console.error("Error updating lead:", error)
    }
  }

  const addActivity = async () => {
    if (!selectedLead || !activityNote) return
    try {
      await fetch(`/api/leads/${selectedLead.id}/activity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity_type: activityType,
          description: activityNote,
        }),
      })
      setActivityNote("")
      fetchLeads()
    } catch (error) {
      console.error("Error adding activity:", error)
    }
  }

  const getScoreBadge = (score: number, classification: string) => {
    if (classification === "hot") {
      return (
        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <Flame className="w-3 h-3 mr-1" /> {score} HOT
        </Badge>
      )
    } else if (classification === "warm") {
      return (
        <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black">
          <ThermometerSun className="w-3 h-3 mr-1" /> {score} WARM
        </Badge>
      )
    } else if (classification === "cold") {
      return (
        <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white">
          <Snowflake className="w-3 h-3 mr-1" /> {score} COLD
        </Badge>
      )
    }
    return <Badge variant="secondary">{score}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-green-500/20 text-green-400 border-green-500/30",
      contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      negotiating: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      under_contract: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      closed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      dead: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    }
    return <Badge className={`${colors[status] || colors.new} border`}>{status.replace("_", " ").toUpperCase()}</Badge>
  }

  const filteredLeads = leads.filter(
    (lead) =>
      searchTerm === "" ||
      lead.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.owner_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-yellow-600 flex items-center justify-center">
                  <span className="text-xl">🍳</span>
                </div>
                <div>
                  <span className="font-bold text-xl">CookinFlips</span>
                  <p className="text-xs text-muted-foreground">Deal Pipeline</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={fetchLeads}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-primary to-yellow-600">
                  <Zap className="w-4 h-4 mr-2" />
                  WarRoom
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-yellow-600/10 border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hot Leads</p>
                  <p className="text-2xl font-bold text-red-500">{stats.hot}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <ThermometerSun className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Warm Leads</p>
                  <p className="text-2xl font-bold text-yellow-500">{stats.warm}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Snowflake className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cold Leads</p>
                  <p className="text-2xl font-bold text-blue-500">{stats.cold}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Potential</p>
                  <p className="text-2xl font-bold text-emerald-500">${(stats.totalProfit / 1000000).toFixed(1)}M</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by address, city, or owner..."
              className="pl-10 bg-card"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filter.status} onValueChange={(v) => setFilter({ ...filter, status: v })}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="negotiating">Negotiating</SelectItem>
              <SelectItem value="under_contract">Under Contract</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="dead">Dead</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filter.classification} onValueChange={(v) => setFilter({ ...filter, classification: v })}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="All Classifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hot">Hot</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cold">Cold</SelectItem>
              <SelectItem value="low_priority">Low Priority</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filter.minScore} onValueChange={(v) => setFilter({ ...filter, minScore: v })}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="Min Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="80">80+ (Hot)</SelectItem>
              <SelectItem value="60">60+ (Warm+)</SelectItem>
              <SelectItem value="40">40+ (Cold+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Leads Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading leads...</p>
            </div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <Card className="p-12 text-center">
            <Home className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No Leads Yet</h3>
            <p className="text-muted-foreground mb-4">
              PropertyRadar leads will appear here once they come through the webhook.
            </p>
            <p className="text-sm text-muted-foreground">
              Webhook URL:{" "}
              <code className="bg-muted px-2 py-1 rounded">https://cookinflips.com/api/webhooks/propertyradar</code>
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="hover:border-primary/50 transition-colors overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Score Section */}
                    <div
                      className={`p-6 flex flex-col items-center justify-center min-w-[140px] ${
                        lead.deal_classification === "hot"
                          ? "bg-gradient-to-br from-red-500/20 to-orange-500/20"
                          : lead.deal_classification === "warm"
                            ? "bg-gradient-to-br from-yellow-500/20 to-amber-500/20"
                            : lead.deal_classification === "cold"
                              ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                              : "bg-muted/50"
                      }`}
                    >
                      <div
                        className={`text-5xl font-bold mb-2 ${
                          lead.deal_classification === "hot"
                            ? "text-red-500"
                            : lead.deal_classification === "warm"
                              ? "text-yellow-500"
                              : lead.deal_classification === "cold"
                                ? "text-blue-500"
                                : "text-muted-foreground"
                        }`}
                      >
                        {lead.saintsal_score}
                      </div>
                      {getScoreBadge(lead.saintsal_score, lead.deal_classification)}
                      <p className="text-xs text-muted-foreground mt-2">SaintSal Score</p>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{lead.address}</h3>
                            {getStatusBadge(lead.status)}
                          </div>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {lead.city}, {lead.state} {lead.zip}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">${lead.estimated_value?.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Est. Value</p>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {lead.bedrooms} bd / {lead.bathrooms} ba
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{lead.square_footage?.toLocaleString()} sqft</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Built {lead.year_built}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{lead.years_owned} yrs owned</span>
                        </div>
                      </div>

                      {/* Distress Indicators */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {lead.is_foreclosure && (
                          <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                            <AlertTriangle className="w-3 h-3 mr-1" /> Foreclosure
                          </Badge>
                        )}
                        {lead.is_tax_delinquent && (
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                            Tax Delinquent: ${lead.tax_delinquent_amount?.toLocaleString()}
                          </Badge>
                        )}
                        {lead.is_vacant && (
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Vacant</Badge>
                        )}
                        {lead.is_inherited && (
                          <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">Inherited</Badge>
                        )}
                        {lead.is_absentee_owner && (
                          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Absentee Owner</Badge>
                        )}
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {lead.equity_percent}% Equity (${lead.equity_amount?.toLocaleString()})
                        </Badge>
                      </div>

                      {/* SaintSal Analysis */}
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-sm">SaintSal AI Analysis</span>
                          <Badge variant="outline" className="ml-auto">
                            {lead.deal_type}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Max Offer</p>
                            <p className="text-lg font-bold text-primary">${lead.max_offer?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Est. Repairs</p>
                            <p className="text-lg font-bold text-orange-500">
                              ${lead.estimated_repairs?.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Potential Profit</p>
                            <p className="text-lg font-bold text-emerald-500">
                              ${lead.potential_profit?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-pre-line">{lead.ai_notes}</p>
                      </div>

                      {/* Owner Info & Actions */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">{lead.owner_name || "Owner Unknown"}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {lead.owner_phone && (
                              <a
                                href={`tel:${lead.owner_phone}`}
                                className="flex items-center gap-1 hover:text-primary"
                              >
                                <Phone className="w-3 h-3" /> {lead.owner_phone}
                              </a>
                            )}
                            {lead.owner_email && (
                              <a
                                href={`mailto:${lead.owner_email}`}
                                className="flex items-center gap-1 hover:text-primary"
                              >
                                <Mail className="w-3 h-3" /> {lead.owner_email}
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select defaultValue={lead.status} onValueChange={(v) => updateLeadStatus(lead.id, v)}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="negotiating">Negotiating</SelectItem>
                              <SelectItem value="under_contract">Under Contract</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="dead">Dead</SelectItem>
                            </SelectContent>
                          </Select>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                                <MessageSquare className="w-4 h-4 mr-1" /> Add Note
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Activity for {lead.address}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                <Select value={activityType} onValueChange={setActivityType}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Activity Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="call">Phone Call</SelectItem>
                                    <SelectItem value="sms">SMS/Text</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="note">Note</SelectItem>
                                    <SelectItem value="offer">Offer Made</SelectItem>
                                    <SelectItem value="visit">Property Visit</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Textarea
                                  placeholder="Enter notes about this activity..."
                                  value={activityNote}
                                  onChange={(e) => setActivityNote(e.target.value)}
                                  rows={4}
                                />
                                <Button onClick={addActivity} className="w-full">
                                  Save Activity
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Link href={`/capital?property=${encodeURIComponent(lead.address)}`}>
                            <Button size="sm" className="bg-gradient-to-r from-primary to-yellow-600">
                              <DollarSign className="w-4 h-4 mr-1" /> Get Funding
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍳</span>
              <span className="font-bold">CookinFlips</span>
              <span className="text-muted-foreground">by SaintSal.ai</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/properties" className="hover:text-primary">
                Property Search
              </Link>
              <Link href="/capital" className="hover:text-primary">
                CookinCapital
              </Link>
              <Link href="/real-estate" className="hover:text-primary">
                CookinSaints RE
              </Link>
              <Link href="/dashboard" className="hover:text-primary">
                WarRoom
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">Powered by PropertyRadar + SaintSal AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
