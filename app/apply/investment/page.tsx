import type { Metadata } from "next"
import { ArrowLeft, TrendingUp, Shield, Target, Banknote, Clock } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Investment Application | CookinCapital",
  description: "Become an investor with CookinCapital - earn passive income through real estate and business lending",
}

export default function InvestmentApplicationPage() {
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
            <span className="text-sm text-gray-400">Accredited Investors Only</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium">Investor Application</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Build <span className="text-[#D4AF37]">Wealth</span> Together
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join our network of investors earning passive income through secured real estate and business loans.
          </p>
        </div>

        {/* Investment Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <Banknote className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-light mb-2">8-12%</h3>
            <p className="text-sm text-gray-400">Target Annual Returns</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <Target className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-light mb-2">$50K</h3>
            <p className="text-sm text-gray-400">Minimum Investment</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <Clock className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-light mb-2">Quarterly</h3>
            <p className="text-sm text-gray-400">Distribution Schedule</p>
          </div>
        </div>

        {/* Application Form */}
        <form className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
          {/* Investor Information */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                1
              </span>
              Investor Information
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
                <label className="block text-sm text-gray-400 mb-2">Entity Name (if applicable)</label>
                <input
                  type="text"
                  placeholder="LLC, Trust, Corporation"
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

          {/* Investment Details */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                2
              </span>
              Investment Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Investment Amount *</label>
                <input
                  type="number"
                  required
                  placeholder="$50,000 minimum"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Investment Strategy *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select strategy</option>
                  <option value="diversified">Diversified Portfolio</option>
                  <option value="commercial">Commercial Real Estate Focus</option>
                  <option value="residential">Residential Focus</option>
                  <option value="fix-flip">Fix & Flip Projects</option>
                  <option value="business">Business Lending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Expected Investment Timeline *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select timeline</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years (long-term)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Risk Tolerance *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select tolerance</option>
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Accreditation Status */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                3
              </span>
              Accreditation Status
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                To invest, you must be an accredited investor as defined by the SEC. Please confirm your status:
              </p>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 bg-black/50 border border-white/10 rounded-lg cursor-pointer hover:border-[#D4AF37]/30 transition-all">
                  <input type="radio" name="accreditation" value="income" className="mt-1" />
                  <div>
                    <div className="font-medium mb-1">Income Requirement</div>
                    <div className="text-sm text-gray-400">
                      Annual income exceeding $200K (individual) or $300K (joint) in each of the prior two years
                    </div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 bg-black/50 border border-white/10 rounded-lg cursor-pointer hover:border-[#D4AF37]/30 transition-all">
                  <input type="radio" name="accreditation" value="networth" className="mt-1" />
                  <div>
                    <div className="font-medium mb-1">Net Worth Requirement</div>
                    <div className="text-sm text-gray-400">Net worth over $1 million (excluding primary residence)</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 bg-black/50 border border-white/10 rounded-lg cursor-pointer hover:border-[#D4AF37]/30 transition-all">
                  <input type="radio" name="accreditation" value="professional" className="mt-1" />
                  <div>
                    <div className="font-medium mb-1">Professional Certification</div>
                    <div className="text-sm text-gray-400">
                      Hold Series 7, 65, or 82 licenses or other qualifying professional certifications
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Investment Goals */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Investment Goals & Notes</label>
            <textarea
              rows={4}
              placeholder="Tell us about your investment objectives, any specific interests, or questions you have..."
              className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50 resize-none"
            />
          </div>

          {/* Terms Agreement */}
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Terms & Disclosures</h3>
            <label className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm text-gray-300">
                I certify that I am an accredited investor and understand that investments involve risk, including the
                possible loss of principal. *
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm text-gray-300">
                I agree to receive investment opportunities, offering materials, and updates from CookinCapital. *
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#D4AF37] text-black py-4 rounded-lg font-semibold hover:bg-[#D4AF37]/90 transition-all"
            >
              Submit Investor Application
            </button>
            <Link
              href="/capital"
              className="flex-1 border-2 border-white/20 text-white py-4 rounded-lg font-semibold hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all text-center"
            >
              Save & Continue Later
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500">
            Questions? Contact our investor relations team at{" "}
            <a href="mailto:ryan@cookinknowledge.com" className="text-[#D4AF37]">
              ryan@cookinknowledge.com
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
