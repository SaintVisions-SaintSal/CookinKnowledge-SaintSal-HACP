import type { Metadata } from "next"
import { ArrowLeft, CreditCard, TrendingDown, Zap, Shield, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Merchant Services Application | Saint Vision Technologies",
  description: "Lower processing fees and access business services with Saint Vision Technologies merchant solutions",
}

export default function MerchantServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm text-gray-400">PCI DSS Compliant</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
            <CreditCard className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium">Merchant Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Lower Your <span className="text-[#D4AF37]">Processing Fees</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Accept all payment types with competitive rates. Plus access payroll, point-of-sale systems, and business
            solutions.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <TrendingDown className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Lower Rates</h3>
            <p className="text-sm text-gray-400">
              Competitive processing fees starting at 1.99% + $0.10 per transaction
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <Zap className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Setup</h3>
            <p className="text-sm text-gray-400">Get approved and start processing within 24-48 hours</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <CheckCircle2 className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Full Service</h3>
            <p className="text-sm text-gray-400">POS systems, payroll, accounting integration, and more</p>
          </div>
        </div>

        {/* Application Form */}
        <form className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
          {/* Business Information */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                1
              </span>
              Business Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Business Name *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">DBA (if different)</label>
                <input
                  type="text"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Business Type *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select business type</option>
                  <option value="llc">LLC</option>
                  <option value="corp">Corporation</option>
                  <option value="scorp">S-Corp</option>
                  <option value="partnership">Partnership</option>
                  <option value="sole">Sole Proprietorship</option>
                  <option value="nonprofit">Non-Profit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Industry *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select industry</option>
                  <option value="retail">Retail</option>
                  <option value="restaurant">Restaurant/Food Service</option>
                  <option value="professional">Professional Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="construction">Construction</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Federal Tax ID (EIN) *</label>
                <input
                  type="text"
                  required
                  placeholder="XX-XXXXXXX"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Years in Business *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select range</option>
                  <option value="<1">Less than 1 year</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact & Owner Information */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                2
              </span>
              Contact & Owner Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Owner First Name *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Owner Last Name *</label>
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
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Business Address *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">City *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">State *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
            </div>
          </div>

          {/* Processing Details */}
          <div>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                3
              </span>
              Processing Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Current Processor (if any)</label>
                <input
                  type="text"
                  placeholder="e.g. Square, Clover, etc."
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Monthly Processing Volume *</label>
                <select className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50">
                  <option value="">Select range</option>
                  <option value="<10k">Less than $10K</option>
                  <option value="10k-25k">$10K - $25K</option>
                  <option value="25k-50k">$25K - $50K</option>
                  <option value="50k-100k">$50K - $100K</option>
                  <option value="100k+">$100K+</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Services Needed</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Credit Card Processing",
                    "Point of Sale System",
                    "Payroll Services",
                    "Online Payments",
                    "Mobile Processing",
                    "Invoicing",
                  ].map((service) => (
                    <label key={service} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-300">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Additional Information</label>
            <textarea
              rows={4}
              placeholder="Tell us about your specific needs, current setup, or any questions..."
              className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37]/50 resize-none"
            />
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
              href="/"
              className="flex-1 border-2 border-white/20 text-white py-4 rounded-lg font-semibold hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all text-center"
            >
              Save & Continue Later
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500">
            Questions? Call us at{" "}
            <a href="tel:+19496301858" className="text-[#D4AF37]">
              (949) 630-1858
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
