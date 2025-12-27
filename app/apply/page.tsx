"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FileText, CreditCard, Building2, Code, ArrowRight, Loader2, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function ApplyPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("lending")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formType: string) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType }),
      })

      if (!response.ok) throw new Error("Submission failed")

      toast({
        title: "Application Submitted!",
        description: "Our team will contact you within 24-48 hours.",
      })

      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Please try again or contact support@cookin.io",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-void via-elevated to-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 glass">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/cookincap.png" alt="SaintSal" width={40} height={40} className="rounded-lg" />
            <span className="font-display text-xl">
              <span className="text-white">SaintSal</span>
              <span className="text-gold">.ai</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/70 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link href="/dashboard" className="btn-gold text-sm">
              WarRoom
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="label-gold">Applications</span>
          <h1 className="font-display text-4xl md:text-6xl mt-4 mb-4">
            Apply <span className="text-gold">Today</span>
          </h1>
          <p className="text-lg text-white/60">
            Select the application type that fits your needs. All applications are reviewed within 24-48 hours.
          </p>
        </div>
      </section>

      {/* Application Forms */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-transparent h-auto p-0 mb-8">
              {[
                { value: "lending", label: "Lending", icon: DollarSign },
                { value: "investment", label: "Investment", icon: Building2 },
                { value: "merchant", label: "Merchant", icon: CreditCard },
                { value: "credit", label: "Credit", icon: FileText },
                { value: "tech", label: "Tech Dev", icon: Code },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex flex-col items-center gap-2 p-4 bg-elevated border border-white/10 rounded-xl data-[state=active]:border-gold data-[state=active]:bg-gold/10"
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-xs">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Lending Application */}
            <TabsContent value="lending">
              <Card className="p-8 bg-elevated border-gold/30">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-8 h-8 text-gold" />
                  <div>
                    <h2 className="font-display text-2xl">Commercial Lending Application</h2>
                    <p className="text-white/50 text-sm">Bridge, Construction, Acquisition, Refinance</p>
                  </div>
                </div>

                <form onSubmit={(e) => handleSubmit(e, "lending")} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name *</Label>
                      <Input name="firstName" required placeholder="John" className="bg-void border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name *</Label>
                      <Input name="lastName" required placeholder="Doe" className="bg-void border-white/10" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="bg-void border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input
                        name="phone"
                        type="tel"
                        required
                        placeholder="(555) 123-4567"
                        className="bg-void border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input name="company" placeholder="ABC Holdings LLC" className="bg-void border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Entity Type</Label>
                      <Select name="entityType">
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select entity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="corp">Corporation</SelectItem>
                          <SelectItem value="lp">Limited Partnership</SelectItem>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="trust">Trust</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Loan Type *</Label>
                      <Select name="loanType" required>
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bridge">Bridge Loan</SelectItem>
                          <SelectItem value="construction">Construction Loan</SelectItem>
                          <SelectItem value="acquisition">Acquisition Loan</SelectItem>
                          <SelectItem value="refinance">Refinance</SelectItem>
                          <SelectItem value="fix-flip">Fix & Flip</SelectItem>
                          <SelectItem value="rental">Rental Portfolio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Loan Amount *</Label>
                      <Select name="loanAmount" required>
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select amount range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                          <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="1m-2.5m">$1M - $2.5M</SelectItem>
                          <SelectItem value="2.5m-5m">$2.5M - $5M</SelectItem>
                          <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                          <SelectItem value="10m+">$10M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Property Type</Label>
                      <Select name="propertyType">
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multifamily">Multi-Family</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                          <SelectItem value="land">Land/Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Property Location</Label>
                      <Input name="propertyLocation" placeholder="City, State" className="bg-void border-white/10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Project Description *</Label>
                    <Textarea
                      name="description"
                      required
                      placeholder="Describe your project, timeline, exit strategy, and any relevant experience..."
                      className="bg-void border-white/10 min-h-[120px]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Credit Score Range</Label>
                      <Select name="creditScore">
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="750+">750+</SelectItem>
                          <SelectItem value="700-749">700 - 749</SelectItem>
                          <SelectItem value="650-699">650 - 699</SelectItem>
                          <SelectItem value="600-649">600 - 649</SelectItem>
                          <SelectItem value="below-600">Below 600</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timeframe</Label>
                      <Select name="timeframe">
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="When do you need funding?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediately</SelectItem>
                          <SelectItem value="30-days">Within 30 Days</SelectItem>
                          <SelectItem value="60-days">Within 60 Days</SelectItem>
                          <SelectItem value="90-days">Within 90 Days</SelectItem>
                          <SelectItem value="exploring">Just Exploring</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-bright text-void font-display text-lg py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Lending Application
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            {/* Investment Application */}
            <TabsContent value="investment">
              <Card className="p-8 bg-elevated border-gold/30">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-8 h-8 text-gold" />
                  <div>
                    <h2 className="font-display text-2xl">Investment Account Application</h2>
                    <p className="text-white/50 text-sm">Syndicate, Direct Lending, Property Pooling</p>
                  </div>
                </div>

                <form onSubmit={(e) => handleSubmit(e, "investment")} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name *</Label>
                      <Input name="firstName" required placeholder="John" className="bg-void border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name *</Label>
                      <Input name="lastName" required placeholder="Doe" className="bg-void border-white/10" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="john@email.com"
                        className="bg-void border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input
                        name="phone"
                        type="tel"
                        required
                        placeholder="(555) 123-4567"
                        className="bg-void border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Investment Type *</Label>
                      <Select name="investmentType" required>
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select investment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="syndicate">Syndicate Investing</SelectItem>
                          <SelectItem value="direct-lending">Direct Lending</SelectItem>
                          <SelectItem value="property-pool">Property Pooling</SelectItem>
                          <SelectItem value="all">Open to All Options</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Investment Amount *</Label>
                      <Select name="investmentAmount" required>
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                          <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                          <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                          <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="1m+">$1M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Accredited Investor Status *</Label>
                    <Select name="accreditedStatus" required>
                      <SelectTrigger className="bg-void border-white/10">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accredited">Yes, I am an accredited investor</SelectItem>
                        <SelectItem value="not-accredited">No, I am not accredited</SelectItem>
                        <SelectItem value="unsure">I am not sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Investment Experience & Goals *</Label>
                    <Textarea
                      name="experience"
                      required
                      placeholder="Describe your investment experience, goals, risk tolerance, and preferred sectors..."
                      className="bg-void border-white/10 min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-bright text-void font-display text-lg py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Investment Application
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            {/* Merchant Services Application */}
            <TabsContent value="merchant">
              <Card className="p-8 bg-elevated border-gold/30">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-8 h-8 text-gold" />
                  <div>
                    <h2 className="font-display text-2xl">Merchant Services & Payroll</h2>
                    <p className="text-white/50 text-sm">Payment Processing, POS, Payroll Solutions</p>
                  </div>
                </div>

                <form onSubmit={(e) => handleSubmit(e, "merchant")} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Business Name *</Label>
                      <Input
                        name="businessName"
                        required
                        placeholder="ABC Company LLC"
                        className="bg-void border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Name *</Label>
                      <Input name="contactName" required placeholder="John Doe" className="bg-void border-white/10" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="bg-void border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input
                        name="phone"
                        type="tel"
                        required
                        placeholder="(555) 123-4567"
                        className="bg-void border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Business Type *</Label>
                      <Select name="businessType" required>
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce</SelectItem>
                          <SelectItem value="professional">Professional Services</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Services Needed *</Label>
                      <Select name="servicesNeeded" required>
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select services" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="payment-processing">Payment Processing</SelectItem>
                          <SelectItem value="pos">POS System</SelectItem>
                          <SelectItem value="payroll">Payroll Services</SelectItem>
                          <SelectItem value="all">All Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Monthly Processing Volume</Label>
                      <Select name="processingVolume">
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-10k">$0 - $10K</SelectItem>
                          <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                          <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                          <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                          <SelectItem value="500k+">$500K+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Number of Employees</Label>
                      <Select name="employees">
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1 - 5</SelectItem>
                          <SelectItem value="6-20">6 - 20</SelectItem>
                          <SelectItem value="21-50">21 - 50</SelectItem>
                          <SelectItem value="51-100">51 - 100</SelectItem>
                          <SelectItem value="100+">100+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Information</Label>
                    <Textarea
                      name="additionalInfo"
                      placeholder="Tell us about your current setup, pain points, and what you're looking for..."
                      className="bg-void border-white/10 min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-bright text-void font-display text-lg py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Merchant Consultation
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            {/* Credit Services */}
            <TabsContent value="credit">
              <Card className="p-8 bg-elevated border-gold/30">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-8 h-8 text-gold" />
                  <div>
                    <h2 className="font-display text-2xl">Credit & Financial Services</h2>
                    <p className="text-white/50 text-sm">Credit Analysis, FICO Monitoring, Financial Planning</p>
                  </div>
                </div>

                <form onSubmit={(e) => handleSubmit(e, "credit")} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name *</Label>
                      <Input name="firstName" required placeholder="John" className="bg-void border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name *</Label>
                      <Input name="lastName" required placeholder="Doe" className="bg-void border-white/10" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="john@email.com"
                        className="bg-void border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input
                        name="phone"
                        type="tel"
                        required
                        placeholder="(555) 123-4567"
                        className="bg-void border-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Service Needed *</Label>
                    <Select name="serviceNeeded" required>
                      <SelectTrigger className="bg-void border-white/10">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-analysis">Credit Analysis & Report</SelectItem>
                        <SelectItem value="fico-monitoring">FICO Score Monitoring</SelectItem>
                        <SelectItem value="credit-repair">Credit Repair Consultation</SelectItem>
                        <SelectItem value="business-credit">Business Credit Building</SelectItem>
                        <SelectItem value="financial-planning">Financial Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>What are your credit goals? *</Label>
                    <Textarea
                      name="goals"
                      required
                      placeholder="Describe your credit goals, current situation, and timeline..."
                      className="bg-void border-white/10 min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-bright text-void font-display text-lg py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Credit Services Request
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            {/* Tech Development */}
            <TabsContent value="tech">
              <Card className="p-8 bg-elevated border-gold/30">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-8 h-8 text-gold" />
                  <div>
                    <h2 className="font-display text-2xl">Technology Development Intake</h2>
                    <p className="text-white/50 text-sm">Software, AI, Automation, Custom Development</p>
                  </div>
                </div>

                <form onSubmit={(e) => handleSubmit(e, "tech")} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Contact Name *</Label>
                      <Input name="contactName" required placeholder="John Doe" className="bg-void border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input name="company" placeholder="Company Name" className="bg-void border-white/10" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="bg-void border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input
                        name="phone"
                        type="tel"
                        required
                        placeholder="(555) 123-4567"
                        className="bg-void border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Type *</Label>
                      <Select name="projectType" required>
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-app">Web Application</SelectItem>
                          <SelectItem value="mobile-app">Mobile Application</SelectItem>
                          <SelectItem value="ai-ml">AI/Machine Learning</SelectItem>
                          <SelectItem value="automation">Business Automation</SelectItem>
                          <SelectItem value="api-integration">API Integration</SelectItem>
                          <SelectItem value="custom">Custom Development</SelectItem>
                          <SelectItem value="consulting">Technical Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Range *</Label>
                      <Select name="budget" required>
                        <SelectTrigger className="bg-void border-white/10">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5k-10k">$5K - $10K</SelectItem>
                          <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                          <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                          <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                          <SelectItem value="100k+">$100K+</SelectItem>
                          <SelectItem value="discuss">Let's Discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Timeline</Label>
                    <Select name="timeline">
                      <SelectTrigger className="bg-void border-white/10">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1-month">Within 1 Month</SelectItem>
                        <SelectItem value="1-3-months">1-3 Months</SelectItem>
                        <SelectItem value="3-6-months">3-6 Months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Project Description *</Label>
                    <Textarea
                      name="description"
                      required
                      placeholder="Describe your project in detail. What problem are you solving? What features do you need? Any existing systems to integrate with?"
                      className="bg-void border-white/10 min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Technical Requirements (Optional)</Label>
                    <Textarea
                      name="technicalRequirements"
                      placeholder="Any specific technologies, frameworks, or integrations required..."
                      className="bg-void border-white/10 min-h-[80px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-bright text-void font-display text-lg py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Tech Project Request
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl mb-4">
            Need Help <span className="text-gold">Deciding?</span>
          </h2>
          <p className="text-white/60 mb-8">
            Chat with SaintSal AI to discuss your needs and get personalized recommendations.
          </p>
          <Link href="/dashboard" className="btn-gold">
            Chat with SaintSal
          </Link>
        </div>
      </section>
    </div>
  )
}
