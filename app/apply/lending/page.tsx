import type { Metadata } from "next"
import { ArrowLeft, DollarSign, TrendingUp, Shield, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Lending Application | CookinCapital",
  description: "Apply for commercial and residential financing with CookinCapital powered by SaintSal AI",
}

export default function LendingApplicationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/capital" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to CookinCapital
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm text-gray-400">Secure Application</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
            <DollarSign className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium">Lending Application</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Get <span className="text-[#D4AF37]">Funded</span> Faster
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Complete your application below. Our team reviews submissions within 24 hours.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <Clock className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Approval</h3>
            <p className="text-sm text-gray-400">Pre-qualification in 24-48 hours with SaintSal AI analysis</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <TrendingUp className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Competitive Rates</h3>
            <p className="text-sm text-gray-400">Access to multiple lenders for the best terms</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <CheckCircle2 className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
            <p className="text-sm text-gray-400">Dedicated loan officers guide you through the process</p>
          </div>
        </div>

        {/* Application Form */}
        <form className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
          {/* Personal Information */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                1
              </span>
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">First Name *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Last Name *</label>
                <input
                  type="text"
                  required
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

          {/* Loan Details */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                2
              </span>
              Loan Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Loan Type *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select loan type</option>
                  <option value="commercial">Commercial Real Estate</option>
                  <option value="residential">Residential</option>
                  <option value="fix-flip">Fix & Flip</option>
                  <option value="bridge">Bridge Loan</option>
                  <option value="construction">Construction</option>
                  <option value="business">Business Loan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Loan Amount *</label>
                <input
                  type="number"
                  required
                  placeholder="$100,000"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Property Address</label>
                <input
                  type="text"
                  placeholder="If applicable"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Credit Score *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select range</option>
                  <option value="750+">750+ (Excellent)</option>
                  <option value="700-749">700-749 (Good)</option>
                  <option value="650-699">650-699 (Fair)</option>
                  <option value="600-649">600-649 (Below Average)</option>
                  <option value="<600">Below 600</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Annual Income *</label>
                <input
                  type="number"
                  required
                  placeholder="$75,000"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                3
              </span>
              Additional Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tell us about your project</label>
                <textarea
                  rows={4}
                  placeholder="Describe your financing needs, project details, timeline, etc."
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Credit Authorization */}
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Credit Authorization</h3>
            <p className="text-sm text-gray-400 mb-4">
              By submitting this application, you authorize CookinCapital and its lending partners to obtain your credit
              report and verify the information provided.
            </p>
            <label className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm text-gray-300">
                I authorize a soft credit pull for pre-qualification purposes. I understand this will not affect my
                credit score. *
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#D4AF37] text-black py-4 rounded-lg font-semibold hover:bg-[#D4AF37]/90 transition-all"
            >
              Submit Application
            </button>
            <Link
              href="/capital"
              className="flex-1 border-2 border-white/20 text-white py-4 rounded-lg font-semibold hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all text-center"
            >
              Save & Continue Later
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500">
            Need help? Call us at{" "}
            <a href="tel:+19496301858" className="text-[#D4AF37]">
              (949) 630-1858
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
