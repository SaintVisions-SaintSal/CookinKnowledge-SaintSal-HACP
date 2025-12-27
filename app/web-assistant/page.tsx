import Link from "next/link"
import Image from "next/image"
import { Globe, Zap, Search, Download, Code, CheckCircle2, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Web Assistant - AI-Powered Web Automation",
  description:
    "Automate web tasks with SaintSal AI. Web scraping, data extraction, form filling, and intelligent web navigation.",
}

export default function WebAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-void via-elevated to-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 glass">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/DripLogoSaintSal_.png" alt="SaintSal" width={40} height={40} className="rounded-lg" />
            <span className="font-display text-xl">
              <span className="text-white">Web</span>
              <span className="text-gold">Assistant</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/70 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link href="/dashboard" className="btn-gold text-sm">
              Launch AI
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="label-gold">SaintSal Web Assistant</span>
          <h1 className="font-display text-5xl md:text-7xl mt-4 mb-6">
            Automate the <span className="text-gold">Entire Web</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            Let SaintSal AI navigate, extract, and automate web tasks for you. From research to data collection, from
            form filling to content generation.
          </p>
          <Link href="/dashboard" className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-4">
            Start Automating <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-center mb-12">
            Powerful <span className="text-gold">Capabilities</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: "Intelligent Search",
                description:
                  "Search across multiple sources, aggregate results, and extract relevant information automatically.",
                features: ["Multi-source search", "Result aggregation", "Smart filtering", "Auto-summarization"],
              },
              {
                icon: Download,
                title: "Data Extraction",
                description: "Extract structured data from any website. Tables, lists, contact info, and more.",
                features: ["Table extraction", "Contact scraping", "Price monitoring", "Content parsing"],
              },
              {
                icon: Code,
                title: "Web Automation",
                description: "Automate repetitive web tasks. Form filling, clicking, navigation, and workflows.",
                features: ["Form automation", "Navigation flows", "Multi-step tasks", "Error handling"],
              },
              {
                icon: Globe,
                title: "Research Assistant",
                description:
                  "Conduct research across the web. Gather information, compare sources, and compile reports.",
                features: ["Multi-site research", "Source comparison", "Report generation", "Citation tracking"],
              },
              {
                icon: Zap,
                title: "Real-Time Monitoring",
                description: "Monitor websites for changes. Price drops, content updates, availability alerts.",
                features: ["Change detection", "Price alerts", "Stock monitoring", "Content tracking"],
              },
              {
                icon: CheckCircle2,
                title: "Quality Assurance",
                description: "Verify web content, check links, validate forms, and ensure site functionality.",
                features: ["Link validation", "Form testing", "Content verification", "Accessibility checks"],
              },
            ].map((capability, index) => (
              <Card key={index} className="p-6 bg-elevated border-white/10 hover:border-gold/50 transition-colors">
                <capability.icon className="w-10 h-10 text-gold mb-4" />
                <h3 className="font-display text-xl mb-3">{capability.title}</h3>
                <p className="text-white/60 text-sm mb-4">{capability.description}</p>
                <ul className="space-y-1">
                  {capability.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle2 className="w-3 h-3 text-gold flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6 bg-void">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-center mb-12">
            Real-World <span className="text-gold">Use Cases</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Lead Generation",
                description:
                  "Extract contact information from business directories, LinkedIn profiles, and company websites automatically.",
                example: "Gather 1,000+ qualified leads per hour",
              },
              {
                title: "Market Research",
                description:
                  "Monitor competitor pricing, track product availability, and analyze market trends across multiple sites.",
                example: "Track 50+ competitors in real-time",
              },
              {
                title: "Content Curation",
                description:
                  "Aggregate content from multiple sources, filter by relevance, and compile into formatted reports.",
                example: "Daily news briefs from 100+ sources",
              },
              {
                title: "Property Research",
                description:
                  "Extract property listings, compare prices, track market data, and identify investment opportunities.",
                example: "Analyze 500+ properties per search",
              },
            ].map((useCase, index) => (
              <Card key={index} className="p-8 bg-elevated border-gold/20">
                <h3 className="font-display text-2xl mb-3">{useCase.title}</h3>
                <p className="text-white/60 mb-4">{useCase.description}</p>
                <div className="px-4 py-2 bg-gold/10 border border-gold/30 rounded-lg">
                  <span className="text-sm text-gold">{useCase.example}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-4">
            Ready to <span className="text-gold">Automate?</span>
          </h2>
          <p className="text-xl text-white/60 mb-8">
            Access the Web Assistant through the SaintSal WarRoom and start automating your web tasks today.
          </p>
          <Link href="/dashboard" className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-4">
            Launch Web Assistant <Globe className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
