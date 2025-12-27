import Link from "next/link"
import Image from "next/image"
import { Bot, Workflow, BarChart3, MessageSquare, FileText, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "AI Brokerage - Automated Commercial Lending",
  description: "See how SaintSal AI powers our complete brokerage automation. From lead intake to loan closing.",
}

export default function BrokeragePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-void via-elevated to-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 glass">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/cookincaplogo.png" alt="AI Brokerage" width={40} height={40} className="rounded-lg" />
            <span className="font-display text-xl">
              <span className="text-white">AI</span>
              <span className="text-gold">Brokerage</span>
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
          <span className="label-gold">AI-Powered Brokerage</span>
          <h1 className="font-display text-5xl md:text-7xl mt-4 mb-6">
            The Future of <span className="text-gold">Commercial Lending</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            See how we use SaintSal AI to automate every step of the commercial lending process. From initial inquiry to
            loan closing.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="#demo" className="btn-gold">
              See the Demo
            </Link>
            <Link href="/capital" className="btn-ghost">
              Apply for Capital
            </Link>
          </div>
        </div>
      </section>

      {/* Automation Workflow */}
      <section id="demo" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-center mb-4">
            Complete <span className="text-gold">Automation</span>
          </h2>
          <p className="text-center text-white/60 mb-12">From first contact to funded deal</p>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold/50 to-transparent hidden md:block"></div>

            <div className="space-y-12">
              {[
                {
                  icon: MessageSquare,
                  title: "Lead Capture & Qualification",
                  description:
                    "AI chatbot engages leads 24/7, qualifies borrowers, and collects preliminary information automatically.",
                  automations: [
                    "24/7 lead engagement",
                    "Automated qualification",
                    "Document collection",
                    "CRM integration",
                  ],
                },
                {
                  icon: BarChart3,
                  title: "Deal Analysis & Underwriting",
                  description:
                    "SaintSal analyzes property data, runs comps, calculates LTV, and generates preliminary underwriting reports.",
                  automations: ["Property analysis", "Automated comps", "LTV calculation", "Risk assessment"],
                },
                {
                  icon: Workflow,
                  title: "Lender Matching",
                  description:
                    "AI matches deals with appropriate lenders based on criteria, preferences, and historical approvals.",
                  automations: ["Lender matching", "Rate shopping", "Program selection", "Submission prep"],
                },
                {
                  icon: FileText,
                  title: "Document Generation",
                  description:
                    "Auto-generate term sheets, LOIs, and submission packages tailored to each lender's requirements.",
                  automations: ["Term sheet generation", "LOI creation", "Package compilation", "Compliance checks"],
                },
                {
                  icon: Bot,
                  title: "Processing & Closing",
                  description:
                    "Track conditions, coordinate with title, schedule closings, and ensure smooth execution to funding.",
                  automations: [
                    "Condition tracking",
                    "Vendor coordination",
                    "Timeline management",
                    "Closing coordination",
                  ],
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Left Side (odd) */}
                    {index % 2 === 0 && (
                      <>
                        <div className="md:w-1/2 md:text-right md:pr-12">
                          <Card className="p-6 bg-elevated border-gold/30 inline-block">
                            <h3 className="font-display text-2xl mb-2">{step.title}</h3>
                            <p className="text-white/60 mb-4">{step.description}</p>
                            <div className="grid grid-cols-2 gap-2">
                              {step.automations.map((auto) => (
                                <div key={auto} className="flex items-center gap-1 text-xs text-white/50">
                                  <Zap className="w-3 h-3 text-gold" />
                                  {auto}
                                </div>
                              ))}
                            </div>
                          </Card>
                        </div>
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-gold items-center justify-center z-10 flex-shrink-0">
                          <step.icon className="w-8 h-8 text-void" />
                        </div>
                        <div className="md:w-1/2"></div>
                      </>
                    )}

                    {/* Right Side (even) */}
                    {index % 2 === 1 && (
                      <>
                        <div className="md:w-1/2"></div>
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-gold items-center justify-center z-10 flex-shrink-0">
                          <step.icon className="w-8 h-8 text-void" />
                        </div>
                        <div className="md:w-1/2 md:pl-12">
                          <Card className="p-6 bg-elevated border-gold/30 inline-block">
                            <h3 className="font-display text-2xl mb-2">{step.title}</h3>
                            <p className="text-white/60 mb-4">{step.description}</p>
                            <div className="grid grid-cols-2 gap-2">
                              {step.automations.map((auto) => (
                                <div key={auto} className="flex items-center gap-1 text-xs text-white/50">
                                  <Zap className="w-3 h-3 text-gold" />
                                  {auto}
                                </div>
                              ))}
                            </div>
                          </Card>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-center mb-12">
            Real <span className="text-gold">Results</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { metric: "95%", label: "Time Savings" },
              { metric: "3x", label: "Faster Closings" },
              { metric: "99.9%", label: "Accuracy Rate" },
              { metric: "24/7", label: "Availability" },
            ].map((stat, index) => (
              <Card key={index} className="p-8 bg-elevated border-white/10 text-center">
                <div className="font-display text-5xl text-gold mb-2">{stat.metric}</div>
                <div className="text-white/50">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Bot className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-display text-4xl mb-4">
            Experience the <span className="text-gold">AI Advantage</span>
          </h2>
          <p className="text-xl text-white/60 mb-8">
            See how SaintSal AI can transform your brokerage operations. Get started today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard" className="btn-gold">
              Try SaintSal AI
            </Link>
            <Link href="/capital" className="btn-ghost">
              Apply for Capital
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
