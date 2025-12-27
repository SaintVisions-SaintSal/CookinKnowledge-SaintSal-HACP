import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Building2,
  TrendingUp,
  Users,
  Shield,
  DollarSign,
  FileText,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export const metadata = {
  title: "CookinCapital - Commercial Lending & Investment Platform",
  description:
    "Access capital through syndicate investing, loan selection, property pooling, and direct lending partnerships.",
}

export default function CapitalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-void via-elevated to-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 glass">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/cookin-capital-logo.png"
              alt="CookinCapital"
              width={200}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/70 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link href="/properties" className="text-white/70 hover:text-white transition-colors text-sm">
              Properties
            </Link>
            <Link href="/dashboard" className="btn-gold text-sm">
              WarRoom
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15),transparent_60%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Powered by SaintSal AI</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl mt-4 mb-6">
              Commercial Lending <span className="text-gold-gradient">Reinvented</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
              Access capital through syndicate investing, select loans from our marketplace, pool funds with other
              investors, or work directly with our lending partners.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply/lending" className="btn-gold flex items-center gap-2">
                Apply for Lending <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/apply/investment" className="btn-ghost flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Become an Investor
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Total Funded", value: "$47M+", icon: DollarSign },
              { label: "Active Loans", value: "156", icon: FileText },
              { label: "Investors", value: "2,400+", icon: Users },
              { label: "Avg Return", value: "12.4%", icon: TrendingUp },
            ].map((stat) => (
              <Card
                key={stat.label}
                className="p-6 bg-elevated border-white/10 text-center group hover:border-gold/50 transition-all"
              >
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-display text-3xl text-gold mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-center mb-12">
            Choose Your <span className="text-gold">Investment Path</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Syndicate Investing */}
            <Card className="p-8 bg-elevated border-gold/30 hover:border-gold transition-colors">
              <Users className="w-12 h-12 text-gold mb-4" />
              <h3 className="font-display text-2xl mb-3">Syndicate Investing</h3>
              <p className="text-white/60 mb-6">
                Join investment syndicates with other investors. Pool capital for larger deals, share due diligence, and
                reduce individual risk.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Minimum investment: $25K",
                  "Vetted deal flow",
                  "Shared due diligence",
                  "Professional management",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/apply/syndicate" className="btn-gold w-full">
                Join Syndicate
              </Link>
            </Card>

            {/* Direct Lending */}
            <Card className="p-8 bg-elevated border-gold/30 hover:border-gold transition-colors">
              <Building2 className="w-12 h-12 text-gold mb-4" />
              <h3 className="font-display text-2xl mb-3">Direct Lending</h3>
              <p className="text-white/60 mb-6">
                Originate loans directly with borrowers. Work with our underwriting team, set your own terms, and manage
                your portfolio.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Minimum investment: $100K",
                  "Custom loan structures",
                  "AI-powered underwriting",
                  "Full control & transparency",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/apply/direct" className="btn-gold w-full">
                Become a Lender
              </Link>
            </Card>

            {/* Property Pooling */}
            <Card className="p-8 bg-elevated border-gold/30 hover:border-gold transition-colors">
              <Shield className="w-12 h-12 text-gold mb-4" />
              <h3 className="font-display text-2xl mb-3">Property Pooling</h3>
              <p className="text-white/60 mb-6">
                Pool funds for specific properties. Co-invest in commercial real estate with fractional ownership and
                shared returns.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Minimum investment: $50K",
                  "Specific property deals",
                  "Fractional ownership",
                  "Quarterly distributions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/apply/pooling" className="btn-gold w-full">
                View Properties
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Loans Marketplace */}
      <section className="py-16 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-center mb-4">
            Active Loan <span className="text-gold">Marketplace</span>
          </h2>
          <p className="text-center text-white/60 mb-12">Browse available loans and investment opportunities</p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                type: "Bridge Loan",
                amount: "$2.4M",
                rate: "9.5%",
                term: "12 months",
                property: "Mixed-Use Commercial",
                ltv: "65%",
                location: "Atlanta, GA",
              },
              {
                type: "Construction",
                amount: "$5.8M",
                rate: "11.2%",
                term: "18 months",
                property: "Multi-Family Development",
                ltv: "70%",
                location: "Phoenix, AZ",
              },
              {
                type: "Acquisition",
                amount: "$3.2M",
                rate: "8.8%",
                term: "24 months",
                property: "Office Building",
                ltv: "60%",
                location: "Dallas, TX",
              },
              {
                type: "Refinance",
                amount: "$1.9M",
                rate: "7.9%",
                term: "36 months",
                property: "Retail Center",
                ltv: "55%",
                location: "Tampa, FL",
              },
            ].map((loan, index) => (
              <Card key={index} className="p-6 bg-elevated border-white/10 hover:border-gold/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="label-gold">{loan.type}</span>
                  <span className="text-gold font-display text-2xl">{loan.rate}</span>
                </div>
                <h3 className="font-display text-xl mb-4">{loan.property}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-white/50 mb-1">Loan Amount</div>
                    <div className="font-display text-lg">{loan.amount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-1">Term</div>
                    <div className="font-display text-lg">{loan.term}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-1">LTV</div>
                    <div className="font-display text-lg">{loan.ltv}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-1">Location</div>
                    <div className="font-display text-lg text-sm">{loan.location}</div>
                  </div>
                </div>
                <Button className="w-full bg-gold hover:bg-gold-bright text-void">
                  View Details <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 bg-transparent">
              View All 156 Loans
            </Button>
          </div>
        </div>
      </section>

      {/* Capital Application Form */}
      <section id="capital-form" className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-elevated border-gold/30">
            <h2 className="font-display text-3xl mb-2">Apply for Capital Access</h2>
            <p className="text-white/60 mb-8">
              Complete this form and our team will reach out within 24 hours to discuss your investment strategy.
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="John" className="bg-void border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" className="bg-void border-white/10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john@example.com" className="bg-void border-white/10" />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" placeholder="(555) 123-4567" className="bg-void border-white/10" />
              </div>

              <div className="space-y-2">
                <Label>Investment Type</Label>
                <Select>
                  <SelectTrigger className="bg-void border-white/10">
                    <SelectValue placeholder="Select investment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="syndicate">Syndicate Investing</SelectItem>
                    <SelectItem value="direct">Direct Lending</SelectItem>
                    <SelectItem value="pooling">Property Pooling</SelectItem>
                    <SelectItem value="all">Open to All Options</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Investment Amount</Label>
                <Select>
                  <SelectTrigger className="bg-void border-white/10">
                    <SelectValue placeholder="Select investment range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                    <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                    <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                    <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                    <SelectItem value="500k+">$500K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Investment Experience</Label>
                <Textarea
                  placeholder="Tell us about your investment experience, goals, and any specific requirements..."
                  className="bg-void border-white/10 min-h-[120px]"
                />
              </div>

              <Button type="submit" className="w-full bg-gold hover:bg-gold-bright text-void font-display text-lg py-6">
                Submit Application
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <MessageSquare className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-display text-4xl mb-4">
            Questions? Let's <span className="text-gold">Talk</span>
          </h2>
          <p className="text-xl text-white/60 mb-8">
            Our capital advisory team is here to help you navigate your investment options.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://saintsal.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Chat with SaintSal AI
            </a>
            <a href="mailto:ryan@cookinknowledge.com" className="btn-ghost">
              Email Ryan Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
