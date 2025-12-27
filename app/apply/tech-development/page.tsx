import type { Metadata } from "next"
import { ArrowLeft, Code2, Rocket, Shield, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Tech Development Intake | Saint Vision Technologies",
  description: "Build your AI-powered platform with patent-protected technology from Saint Vision Technologies",
}

export default function TechDevelopmentPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/services" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm text-gray-400">US Patent #10,290,222</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
            <Code2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium">Tech Development Intake</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Build With <span className="text-[#D4AF37]">Purpose</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tell us about your project. We'll create a custom proposal with timeline, pricing, and IP protection
            strategy.
          </p>
        </div>

        {/* What You Get */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <Rocket className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Rapid Development</h3>
            <p className="text-sm text-gray-400">10x faster builds with our AI-powered development platform</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <Shield className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">IP Protection</h3>
            <p className="text-sm text-gray-400">Build under our patent umbrella with HACP technology</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <Sparkles className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Production Ready</h3>
            <p className="text-sm text-gray-400">Enterprise-grade with deployment, monitoring, and support</p>
          </div>
        </div>

        {/* Intake Form */}
        <form className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                1
              </span>
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Company/Organization</label>
                <input
                  type="text"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                2
              </span>
              Project Overview
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="What's your project called?"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Type *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select project type</option>
                  <option value="web-app">Web Application</option>
                  <option value="mobile-app">Mobile App (iOS/Android)</option>
                  <option value="ai-platform">AI Platform/Chatbot</option>
                  <option value="api">API/Backend Service</option>
                  <option value="ecommerce">E-Commerce Platform</option>
                  <option value="crm">CRM/Business Software</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Description *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Describe your project in detail. What problem does it solve? Who are the users? What are the main features?"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Technical Requirements */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                3
              </span>
              Technical Requirements
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-3">Core Features Needed</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "User Authentication",
                    "Database/Data Storage",
                    "Payment Processing",
                    "AI/ML Integration",
                    "Real-time Chat/Messaging",
                    "File Upload/Storage",
                    "Email/SMS Notifications",
                    "Analytics/Reporting",
                    "Admin Dashboard",
                    "API Integrations",
                    "Search Functionality",
                    "Mobile Responsive Design",
                  ].map((feature) => (
                    <label key={feature} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Current Tech Stack (if any)</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, Python, AWS, etc."
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Do you have existing code/systems?</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select option</option>
                  <option value="no">No - Starting from scratch</option>
                  <option value="yes-migrate">Yes - Need to migrate/integrate</option>
                  <option value="yes-enhance">Yes - Need to enhance existing system</option>
                </select>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                4
              </span>
              Timeline & Budget
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Desired Timeline *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP (2-4 weeks)</option>
                  <option value="1-2">1-2 months</option>
                  <option value="3-4">3-4 months</option>
                  <option value="6+">6+ months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Budget Range *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select budget</option>
                  <option value="5-15k">$5K - $15K (Tier 1 Starter)</option>
                  <option value="15-50k">$15K - $50K (Tier 2 Professional)</option>
                  <option value="50k+">$50K+ (Tier 3 Enterprise)</option>
                  <option value="licensing">Licensing/API Access</option>
                  <option value="discuss">Prefer to Discuss</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Additional Notes & Goals</label>
            <textarea
              rows={4}
              placeholder="Tell us about your vision, success metrics, any specific concerns, or questions you have..."
              className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50 resize-none"
            />
          </div>

          {/* IP Protection Interest */}
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              Intellectual Property Protection
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              All projects built with Saint Vision Technologies can be protected under our US Patent #10,290,222 (filed
              2015, granted 2019) and trademark umbrella for additional security.
            </p>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <span className="text-sm text-gray-300">
                I'm interested in learning more about IP protection for my project
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#D4AF37] text-black py-4 rounded-lg font-semibold hover:bg-[#D4AF37]/90 transition-all"
            >
              Submit Project Intake
            </button>
            <Link
              href="/services"
              className="flex-1 border-2 border-white/20 text-white py-4 rounded-lg font-semibold hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all text-center"
            >
              Back to Services
            </Link>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              Response time: We'll review your submission and send a detailed proposal within 24-48 hours.
            </p>
            <p className="text-sm text-gray-500">
              Questions? Call Ryan directly at{" "}
              <a href="tel:+19496301858" className="text-[#D4AF37]">
                (949) 630-1858
              </a>{" "}
              or email{" "}
              <a href="mailto:ryan@cookinknowledge.com" className="text-[#D4AF37]">
                ryan@cookinknowledge.com
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
