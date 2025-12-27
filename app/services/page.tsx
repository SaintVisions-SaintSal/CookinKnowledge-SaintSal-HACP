"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import {
  Shield,
  Award,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  Crown,
  Sparkles,
  Lock,
  Cpu,
  Users,
  TrendingUp,
  FileCheck,
  Scale,
  Star,
  Calendar,
  MessageSquare,
  Loader2,
  Check,
} from "lucide-react"

export default function ServicesPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceTier: "",
    serviceInterest: [] as string[],
    budgetRange: "",
    timeline: "",
    projectDescription: "",
    currentTechStack: "",
    goals: "",
    preferredDate: "",
    preferredTime: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/services/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.JSONstringify({
          ...formData,
          serviceTier: selectedTier || formData.serviceTier,
        }),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          serviceTier: "",
          serviceInterest: [],
          budgetRange: "",
          timeline: "",
          projectDescription: "",
          currentTechStack: "",
          goals: "",
          preferredDate: "",
          preferredTime: "",
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceInterestToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceInterest: prev.serviceInterest.includes(service)
        ? prev.serviceInterest.filter((s) => s !== service)
        : [...prev.serviceInterest, service],
    }))
  }

  const tiers = [
    {
      id: "starter",
      tier: 1,
      name: "SaintSal Starter",
      subtitle: "Business in a Box",
      price: "$5,000",
      priceMax: "$15,000",
      features: [
        "Custom domain + SSL + branding",
        "Next.js landing page (premium design)",
        "SaintSal AI chat widget (branded)",
        "Lead capture with CRM integration",
        "Mobile responsive design",
        '"Powered by SaintSal" badge',
      ],
      ideal: "Entrepreneurs, coaches, consultants, SMBs",
      popular: false,
    },
    {
      id: "professional",
      tier: 2,
      name: "SaintSal Professional",
      subtitle: "Full Platform Build",
      price: "$15,000",
      priceMax: "$50,000",
      features: [
        "Everything in Starter, plus:",
        "Full Next.js application",
        "Multi-model AI (Claude, GPT-4, Grok)",
        "Voice AI + transcription",
        "Stripe payments + subscriptions",
        "HACP Framework implementation",
        "SaintSal white-label license",
      ],
      ideal: "Agencies, practices, growing businesses",
      popular: true,
    },
    {
      id: "enterprise",
      tier: 3,
      name: "SaintSal Enterprise",
      subtitle: "Custom Platform + IP License",
      price: "$50,000",
      priceMax: "+",
      features: [
        "Everything in Professional, plus:",
        "Custom platform architecture",
        "PE fund / investor portals",
        "Multi-tenant SaaS capabilities",
        "Full HACP licensing",
        "Patent #10,290,222 umbrella",
        "Legal counsel review",
      ],
      ideal: "PE funds, FinTech, HealthTech, LegalTech",
      popular: false,
    },
    {
      id: "licensing",
      tier: 4,
      name: "SaintSal Licensing",
      subtitle: "Technology Partnership",
      price: "Custom",
      priceMax: "/month",
      features: [
        "API Access: $2,500/mo",
        "White-Label: $7,500/mo",
        "Agency Partner: $15,000/mo",
        "Enterprise OEM: $25,000+/mo",
        "Revenue share options available",
        "Full IP protection",
      ],
      ideal: "Agencies, developers, enterprise tech teams",
      popular: false,
    },
  ]

  const serviceOptions = [
    "AI Platform Development",
    "Mobile App Development",
    "SaaS Platform",
    "Investor Portal",
    "CRM Integration",
    "Payment Processing",
    "Voice AI",
    "White-Label Solution",
    "API Integration",
    "Custom AI Training",
  ]

  const caseStudies = [
    {
      name: "CookinFlips",
      type: "Real Estate Investment Platform",
      description: "Full investor portal with deal analysis, lending products, and AI underwriting.",
      tags: ["Next.js", "SaintSal AI", "GHL Integration"],
    },
    {
      name: "CapCookin.io",
      type: "PE Fund Management",
      description: "SEC-compliant investor management, waterfall distributions, and capital call automation.",
      tags: ["Fund Admin", "Investor Portal", "Compliance"],
    },
    {
      name: "CookinCapital",
      type: "Private Lending Platform",
      description: "Borrower and investor portal with AI-assisted underwriting and deal scoring.",
      tags: ["Lending", "Investor Portal", "SaintSal AI"],
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-2xl p-8 my-8">
            <button
              onClick={() => {
                setShowForm(false)
                setSubmitSuccess(false)
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h3 className="text-2xl font-light mb-4">Thank You!</h3>
                <p className="text-gray-400 mb-6">
                  Your consultation request has been submitted. Ryan will personally review and reach out within 24
                  hours.
                </p>
                <p className="text-[#D4AF37] text-sm italic mb-8">
                  "For I know the plans I have for you, declares the Lord"
                </p>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setSubmitSuccess(false)
                  }}
                  className="bg-[#D4AF37] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#D4AF37]/90 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-4">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-sm font-medium">Schedule Consultation</span>
                  </div>
                  <h3 className="text-2xl font-light mb-2">Let&apos;s Build Something Great</h3>
                  <p className="text-gray-500">
                    {selectedTier
                      ? `Selected: ${tiers.find((t) => t.id === selectedTier)?.name}`
                      : "Tell us about your project"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {!selectedTier && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Service Tier</label>
                      <select
                        value={formData.serviceTier}
                        onChange={(e) => setFormData((prev) => ({ ...prev, serviceTier: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                      >
                        <option value="">Select a tier...</option>
                        <option value="starter">Tier 1 - Starter ($5K-$15K)</option>
                        <option value="professional">Tier 2 - Professional ($15K-$50K)</option>
                        <option value="enterprise">Tier 3 - Enterprise ($50K+)</option>
                        <option value="licensing">Tier 4 - Licensing (Custom)</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Services Interested In</label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceInterestToggle(service)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            formData.serviceInterest.includes(service)
                              ? "bg-[#D4AF37] text-black"
                              : "bg-white/5 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Budget Range</label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData((prev) => ({ ...prev, budgetRange: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                      >
                        <option value="">Select budget...</option>
                        <option value="$5K-$15K">$5,000 - $15,000</option>
                        <option value="$15K-$30K">$15,000 - $30,000</option>
                        <option value="$30K-$50K">$30,000 - $50,000</option>
                        <option value="$50K-$100K">$50,000 - $100,000</option>
                        <option value="$100K+">$100,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                      >
                        <option value="">Select timeline...</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1-2 weeks">1-2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="2-3 months">2-3 months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Project Description</label>
                    <textarea
                      value={formData.projectDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, projectDescription: e.target.value }))}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#D4AF37]/50 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project vision..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Goals & Objectives</label>
                    <textarea
                      value={formData.goals}
                      onChange={(e) => setFormData((prev) => ({ ...prev, goals: e.target.value }))}
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#D4AF37]/50 focus:outline-none transition-colors resize-none"
                      placeholder="What do you want to achieve?"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Preferred Time</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData((prev) => ({ ...prev, preferredTime: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                      >
                        <option value="">Select time...</option>
                        <option value="9:00 AM PST">9:00 AM PST</option>
                        <option value="10:00 AM PST">10:00 AM PST</option>
                        <option value="11:00 AM PST">11:00 AM PST</option>
                        <option value="12:00 PM PST">12:00 PM PST</option>
                        <option value="1:00 PM PST">1:00 PM PST</option>
                        <option value="2:00 PM PST">2:00 PM PST</option>
                        <option value="3:00 PM PST">3:00 PM PST</option>
                        <option value="4:00 PM PST">4:00 PM PST</option>
                        <option value="5:00 PM PST">5:00 PM PST</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#D4AF37] text-black py-4 rounded-lg font-semibold hover:bg-[#D4AF37]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-5 h-5" />
                        Submit Consultation Request
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-600 text-sm">
                    Or call directly:{" "}
                    <a href="tel:+19496301858" className="text-[#D4AF37]">
                      (949) 630-1858
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_1px,_transparent_1px)] bg-[length:50px_50px]" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Company Badge */}
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-medium">
              Saint Vision Technologies LLC
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            Build With <span className="text-[#D4AF37] font-semibold">Purpose</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            AI platforms built on protected intellectual property. Strategic planning meets integrity. Your vision,
            legally defensible, ready to scale.
          </p>

          {/* Patent Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-[#D4AF37]/30 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">
              Built on <span className="text-[#D4AF37] font-medium">US Patent #10,290,222</span> - Filed September 2015
            </span>
          </div>

          <p className="text-gray-500 text-sm italic max-w-xl mx-auto mb-10">
            &quot;True wealth is not just measured in assets, but in how faithfully we steward the resources entrusted
            to us.&quot;
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AF37]/90 transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              Schedule Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:+19496301858"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-lg font-medium hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all"
            >
              <Phone className="w-5 h-5" />
              (949) 630-1858
            </a>
          </div>
        </div>
      </section>

      {/* The Difference Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">
              Why Build With <span className="text-[#D4AF37]">Saint Vision</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Most AI agencies sell you a wrapper. We provide you with protected infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Left: The Problem */}
            <div className="bg-red-950/10 border border-red-900/20 rounded-2xl p-8">
              <h3 className="text-xl text-red-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
                  X
                </span>
                Without IP Protection
              </h3>
              <div className="space-y-4">
                {[
                  "Building on unprotected AI infrastructure",
                  "No legal standing in IP disputes",
                  "Vulnerable to copycats and claims",
                  "No defensibility for investors or boards",
                  "Generic technology anyone can replicate",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="text-red-400/60 mt-1">X</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: The Solution */}
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-8 rounded-2xl border border-[#D4AF37]/30">
              <h3 className="text-xl text-[#D4AF37] uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                </span>
                With Saint Vision
              </h3>
              <div className="space-y-4">
                {[
                  "Patent #10,290,222 umbrella protection",
                  "HACP Framework - Human-AI Collaborative Processing",
                  "SaintSal trademark protection (Classes 009, 042, 035)",
                  "Legal counsel review for enterprise licensing",
                  "Foundational IP that predates ChatGPT, Claude, all major AI",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-[#D4AF37] mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Patent Filed Before Everyone */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium">Protected Since 2015</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light mb-4">
              <span className="text-[#D4AF37]">Foundational</span> Intellectual Property
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Our patent for Human-AI Collaborative Processing was filed years before the AI revolution began. This is
              not hindsight - it is vision.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-transparent" />

            {/* Timeline Items */}
            <div className="space-y-16">
              {/* 2015 - Patent Filed */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#D4AF37] rounded-full ring-4 ring-[#D4AF37]/20 z-10" />
                <div className="w-1/2 pr-12 text-right">
                  <div className="text-[#D4AF37] font-bold text-3xl">September 2015</div>
                  <div className="text-white text-xl font-medium">HACP Patent Filed</div>
                  <div className="text-gray-500 text-sm mt-1">US Patent #10,290,222</div>
                </div>
                <div className="w-1/2 pl-12">
                  <div className="text-gray-500 text-sm bg-white/5 p-4 rounded-lg border border-white/10">
                    Human-AI Collaborative Processing with escalation/de-escalation protocols
                  </div>
                </div>
              </div>

              {/* 2019 - Patent Granted */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#D4AF37]/60 rounded-full z-10" />
                <div className="w-1/2 pr-12 text-right">
                  <div className="text-[#D4AF37]/80 font-bold text-2xl">May 2019</div>
                  <div className="text-white text-lg font-medium">Patent Granted</div>
                </div>
                <div className="w-1/2 pl-12">
                  <div className="text-gray-600 text-sm">USPTO issues US Patent #10,290,222</div>
                </div>
              </div>

              {/* 2019 - GPT-2 */}
              <div className="relative flex items-center opacity-60">
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full z-10" />
                <div className="w-1/2 pr-12 text-right">
                  <div className="text-gray-500 font-bold text-xl">February 2019</div>
                  <div className="text-gray-400">OpenAI releases GPT-2</div>
                </div>
                <div className="w-1/2 pl-12">
                  <div className="text-[#D4AF37]/60 text-sm font-medium">4 years after our patent filing</div>
                </div>
              </div>

              {/* 2022 - ChatGPT */}
              <div className="relative flex items-center opacity-60">
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full z-10" />
                <div className="w-1/2 pr-12 text-right">
                  <div className="text-gray-500 font-bold text-xl">November 2022</div>
                  <div className="text-gray-400">ChatGPT launches</div>
                </div>
                <div className="w-1/2 pl-12">
                  <div className="text-[#D4AF37]/60 text-sm font-medium">7 years after our patent filing</div>
                </div>
              </div>

              {/* 2023 - Claude */}
              <div className="relative flex items-center opacity-60">
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full z-10" />
                <div className="w-1/2 pr-12 text-right">
                  <div className="text-gray-500 font-bold text-xl">March 2023</div>
                  <div className="text-gray-400">Anthropic launches Claude</div>
                </div>
                <div className="w-1/2 pl-12">
                  <div className="text-[#D4AF37]/60 text-sm font-medium">8 years after our patent filing</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg">
              Building with Saint Vision means building on a foundation that was established
              <span className="text-[#D4AF37]"> before the industry existed</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-4">
              Service <span className="text-[#D4AF37]">Tiers</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              From business-in-a-box to enterprise IP licensing - choose the level that fits your vision.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`group relative rounded-2xl p-6 transition-all duration-300 ${
                  tier.popular
                    ? "bg-gradient-to-b from-[#D4AF37]/15 to-transparent border-2 border-[#D4AF37]/40 scale-105"
                    : "bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/30"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="text-[#D4AF37]/60 text-xs uppercase tracking-wider mb-2">Tier {tier.tier}</div>
                <h3 className="text-2xl font-light mb-1">{tier.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{tier.subtitle}</p>

                <div className="text-3xl font-light text-[#D4AF37] mb-6">
                  {tier.price}
                  <span className="text-lg text-gray-500">
                    {tier.priceMax !== "+" ? `-${tier.priceMax}` : tier.priceMax}
                  </span>
                </div>

                <ul className="space-y-3 text-sm text-gray-400 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#D4AF37] mt-0.5">-</span>
                      <span
                        className={
                          feature.includes("HACP") || feature.includes("Patent") || feature.includes("IP")
                            ? "text-[#D4AF37]"
                            : ""
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="text-xs text-gray-600 italic mb-4">Perfect for: {tier.ideal}</div>

                <button
                  onClick={() => {
                    setSelectedTier(tier.id)
                    setShowForm(true)
                  }}
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-all ${
                    tier.popular
                      ? "bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
                      : "border border-white/20 text-white hover:border-[#D4AF37]/50"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Enterprise Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-sm mb-4">For Sophisticated Buyers</p>
            <h2 className="text-3xl md:text-5xl font-light mb-6">
              Why <span className="text-[#D4AF37]">Patent Protection</span> Matters
            </h2>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12">
            <p className="text-gray-400 leading-relaxed mb-8 text-lg">
              In 2015, Ryan Capatosto filed for what would become{" "}
              <span className="text-white font-medium">US Patent #10,290,222</span> - a system for human-AI
              collaborative processing with escalation and de-escalation protocols. This was{" "}
              <span className="text-[#D4AF37]">three years before GPT-2</span>,{" "}
              <span className="text-[#D4AF37]">seven years before ChatGPT</span>.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8 text-lg">
              When you build your AI platform with Saint Vision Technologies, you are not just getting code. You are
              getting:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Scale className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">Legal Standing</div>
                    <div className="text-gray-500">Your platform operates under our patent umbrella</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">Defensibility</div>
                    <div className="text-gray-500">In any IP challenge, you have documented licensing</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">Credibility</div>
                    <div className="text-gray-500">Board-level assurance that your AI has proper foundations</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">HACP Framework</div>
                    <div className="text-gray-500">Human oversight built in (critical for regulated industries)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-center text-xl text-gray-400 italic">
                &quot;This is not a website. This is <span className="text-[#D4AF37] font-medium">infrastructure</span>
                .&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <div className="aspect-square bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl flex items-center justify-center border border-[#D4AF37]/20 overflow-hidden">
                <Image
                  src="/images/svtsaintsal.png"
                  alt="Saint Vision Technologies - AI Platform"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-sm mb-4">The Founder</p>
              <h2 className="text-3xl md:text-4xl font-light mb-6">Ryan Capatosto</h2>
              <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                Founder of Saint Vision Technologies and Saint Vision Group, holding US Patent #10,290,222 for Human-AI
                Collaborative Processing (HACP). A former <span className="text-white">Goldman Sachs</span> and{" "}
                <span className="text-white">JP Morgan</span> professional, Ryan has invested over{" "}
                <span className="text-[#D4AF37] font-semibold">$1.7 million of personal capital</span> into building the
                SaintSal ecosystem - not with VC money, but with conviction.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                His patent, filed in September 2015, predates every major AI platform by years. While others were still
                theorizing about AI assistants, Ryan was documenting the architecture for human-AI collaboration with
                proper escalation protocols.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Today, through the{" "}
                <span className="text-[#D4AF37]">Saint Vision Institute of AI Research and Development</span>, Ryan and
                his team continue pushing the boundaries of what is possible - building platforms that do not just use
                AI, but do it right. Human-centered. Patent-protected. Purpose-driven.
              </p>
              <blockquote className="border-l-4 border-[#D4AF37] pl-6 italic text-gray-400 text-lg">
                &quot;I am a student every single day. I study. I grow. I build. And I make sure everyone who builds
                with us has the legal ground to grow with confidence.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-[#0a0a0a] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D4AF37]/60 uppercase tracking-[0.2em] text-sm mb-6">Our Foundation</p>
          <h2 className="text-3xl md:text-5xl font-light mb-12">
            Built on <span className="text-[#D4AF37]">Integrity</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <div className="text-[#D4AF37] text-2xl font-light mb-3">Stewardship</div>
              <p className="text-gray-500">
                Resources entrusted to us are grown, protected, and multiplied with purpose.
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <div className="text-[#D4AF37] text-2xl font-light mb-3">Integrity</div>
              <p className="text-gray-500">We do what is right - not just what is profitable. Our word is our bond.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <div className="text-[#D4AF37] text-2xl font-light mb-3">Service</div>
              <p className="text-gray-500">
                Technology should serve humanity, not replace it. Humans always in the loop.
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            These values guide everything we build. Not as requirements, but as foundations. Everyone is welcome here -
            we build for all who share a commitment to excellence and integrity.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-4">
              What We Have <span className="text-[#D4AF37]">Built</span>
            </h2>
            <p className="text-gray-400 text-lg">Real platforms. Real results. Real IP protection.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((project, i) => (
              <div
                key={i}
                className="group bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="text-[#D4AF37] text-sm mb-2 font-medium">{project.type}</div>
                <h3 className="text-2xl font-light mb-4">{project.name}</h3>
                <p className="text-gray-500 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium">Ready to Start?</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-light mb-6">
            Ready to Build With <span className="text-[#D4AF37]">Purpose</span>?
          </h2>
          <p className="text-gray-400 mb-10 text-xl max-w-2xl mx-auto">
            Schedule a consultation to discuss your vision and how we can bring it to life with protected intellectual
            property.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-10 py-5 rounded-xl font-semibold hover:bg-[#D4AF37]/90 transition-all text-lg shadow-lg shadow-[#D4AF37]/20"
            >
              <Mail className="w-5 h-5" />
              Schedule Consultation
            </button>
            <a
              href="tel:+19496301858"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-10 py-5 rounded-xl font-semibold hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all text-lg"
            >
              <Phone className="w-5 h-5" />
              Call (949) 630-1858
            </a>
          </div>

          <div className="border-t border-white/5 pt-12">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
                US Patent #10,290,222
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#D4AF37]" />
                HACP Framework
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                SaintSal (009, 042, 035)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Store Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 mb-6">Experience SaintSal AI on Mobile</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://apps.apple.com/us/app/saintsal/id6752356451"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-6 py-3 hover:border-[#D4AF37]/30 transition-all"
            >
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="text-white font-medium">App Store</div>
              </div>
              <div className="flex items-center gap-1 ml-2 text-[#D4AF37]">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-sm font-medium">5.0</span>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.saintvision.faithfulapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-6 py-3 hover:border-[#D4AF37]/30 transition-all"
            >
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="text-white font-medium">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/driplogosaintsal-e2-84-a2.png"
            alt="SaintSal"
            width={80}
            height={80}
            className="opacity-60"
          />
        </div>
        <p className="text-gray-600 text-sm mb-2">2025 Saint Vision Technologies LLC. All rights reserved.</p>
        <p className="text-gray-700 text-xs">Strategic Planning and Integrity</p>
      </footer>
    </main>
  )
}
