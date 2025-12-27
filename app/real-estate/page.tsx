import Link from "next/link"
import Image from "next/image"
import { Home, Users, Scale, TrendingUp, MapPin, CheckCircle2, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export const metadata = {
  title: "CookinSaints RE - Real Estate Division",
  description:
    "Connect with wholesalers, attorneys, and real estate professionals. Access deals, legal support, and investment opportunities.",
}

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-void via-elevated to-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 glass">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/SVTLOGO_copy.png" alt="CookinSaints RE" width={40} height={40} className="rounded-lg" />
            <span className="font-display text-xl">
              <span className="text-white">CookinSaints</span>
              <span className="text-gold"> RE</span>
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

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="label-gold">CookinSaints RE</span>
          <h1 className="font-display text-5xl md:text-7xl mt-4 mb-6">
            Real Estate <span className="text-gold">Ecosystem</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Your complete real estate network. Connect with wholesalers, partner with attorneys, access off-market
            deals, and build your investment portfolio with SaintSal AI.
          </p>
        </div>
      </section>

      {/* Network Sections */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Wholesaler Network */}
          <Card className="p-8 bg-elevated border-gold/30">
            <Home className="w-12 h-12 text-gold mb-4" />
            <h3 className="font-display text-2xl mb-3">Wholesaler Network</h3>
            <p className="text-white/60 mb-6">
              Access our vetted network of wholesalers bringing off-market deals directly to you. From single-family to
              multi-family opportunities.
            </p>
            <ul className="space-y-2 mb-6">
              {["Off-market deals", "Verified property data", "Direct communication", "AI-powered analysis"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <a href="#wholesaler-form" className="btn-gold w-full">
              Join as Wholesaler
            </a>
          </Card>

          {/* Attorney Partners */}
          <Card className="p-8 bg-elevated border-gold/30">
            <Scale className="w-12 h-12 text-gold mb-4" />
            <h3 className="font-display text-2xl mb-3">Attorney Partners</h3>
            <p className="text-white/60 mb-6">
              Connect with real estate attorneys specializing in transactions, contracts, and compliance. Legal support
              when you need it.
            </p>
            <ul className="space-y-2 mb-6">
              {["Transaction support", "Contract review", "Title issues", "Closing assistance"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#attorney-form" className="btn-gold w-full">
              Partner as Attorney
            </a>
          </Card>

          {/* Investor Access */}
          <Card className="p-8 bg-elevated border-gold/30">
            <TrendingUp className="w-12 h-12 text-gold mb-4" />
            <h3 className="font-display text-2xl mb-3">Investor Access</h3>
            <p className="text-white/60 mb-6">
              Get exclusive access to investment opportunities, deal flow, and partnership opportunities across our
              entire network.
            </p>
            <ul className="space-y-2 mb-6">
              {["Curated deal flow", "Partnership opportunities", "Market insights", "Portfolio tracking"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <a href="#investor-form" className="btn-gold w-full">
              Become an Investor
            </a>
          </Card>
        </div>
      </section>

      {/* Active Deals */}
      <section className="py-16 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-center mb-12">
            Active <span className="text-gold">Opportunities</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: "Fix & Flip",
                address: "1245 Oak Street",
                city: "Atlanta, GA",
                arv: "$425K",
                investment: "$185K",
                profit: "$85K+",
                status: "Available",
              },
              {
                type: "Buy & Hold",
                address: "892 Pine Avenue",
                city: "Phoenix, AZ",
                arv: "$385K",
                investment: "$245K",
                profit: "$1,850/mo",
                status: "Available",
              },
              {
                type: "Commercial",
                address: "3400 Market St",
                city: "Dallas, TX",
                arv: "$2.1M",
                investment: "$1.4M",
                profit: "$175K/yr",
                status: "Under Review",
              },
            ].map((deal, index) => (
              <Card key={index} className="p-6 bg-elevated border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="label-gold">{deal.type}</span>
                  <span className="text-xs px-2 py-1 bg-gold/20 text-gold rounded-full">{deal.status}</span>
                </div>
                <h3 className="font-display text-xl mb-2">{deal.address}</h3>
                <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {deal.city}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">ARV</span>
                    <span className="text-gold font-display">{deal.arv}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Investment</span>
                    <span>{deal.investment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Est. Profit</span>
                    <span className="text-gold font-display">{deal.profit}</span>
                  </div>
                </div>
                <Button className="w-full bg-gold hover:bg-gold-bright text-void">View Details</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Forms */}
      <section id="wholesaler-form" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Wholesaler Application */}
            <Card className="p-8 bg-elevated border-gold/30">
              <Home className="w-10 h-10 text-gold mb-4" />
              <h3 className="font-display text-2xl mb-4">Wholesaler Application</h3>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Your name" className="bg-void border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" className="bg-void border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="(555) 123-4567" className="bg-void border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Markets You Operate In</Label>
                  <Input placeholder="e.g., Atlanta, Phoenix" className="bg-void border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Average Deals Per Month</Label>
                  <Select>
                    <SelectTrigger className="bg-void border-white/10">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 deals</SelectItem>
                      <SelectItem value="6-10">6-10 deals</SelectItem>
                      <SelectItem value="11-20">11-20 deals</SelectItem>
                      <SelectItem value="20+">20+ deals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-gold hover:bg-gold-bright text-void">
                  Submit Application
                </Button>
              </form>
            </Card>

            {/* Attorney/Investor Combined Form */}
            <Card className="p-8 bg-elevated border-gold/30">
              <Users className="w-10 h-10 text-gold mb-4" />
              <h3 className="font-display text-2xl mb-4">Partner Application</h3>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger className="bg-void border-white/10">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attorney">Real Estate Attorney</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Your name" className="bg-void border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" className="bg-void border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="(555) 123-4567" className="bg-void border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Experience</Label>
                  <Textarea
                    placeholder="Tell us about your experience..."
                    className="bg-void border-white/10 min-h-[100px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-gold hover:bg-gold-bright text-void">
                  Submit Application
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <Briefcase className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-display text-4xl mb-4">
            Ready to <span className="text-gold">Get Started?</span>
          </h2>
          <p className="text-xl text-white/60 mb-8">
            Join the CookinSaints RE network and start accessing exclusive real estate opportunities today.
          </p>
          <Link href="/dashboard" className="btn-gold inline-flex items-center gap-2">
            Access WarRoom <Users className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
