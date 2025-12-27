"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Bot,
  Mic,
  Eye,
  Search,
  ImageIcon,
  Video,
  DollarSign,
  Home,
  TrendingUp,
  Code,
  Users,
  Star,
  Menu,
  X,
  MessageSquare,
  Zap,
  Shield,
  CheckCircle2,
  Newspaper,
  Trophy,
  Building2,
} from "lucide-react"

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const ecosystemLinks = [
    { name: "CookinCapital", href: "/capital", desc: "Investment & Lending" },
    { name: "CookinSaints RE", href: "/real-estate", desc: "Real Estate Network" },
    { name: "Property Search", href: "/properties", desc: "PropertyRadar Powered" },
    { name: "Deal Pipeline", href: "/pipeline", desc: "Lead Management" },
  ]

  const saintSalLinks = [
    { name: "WarRoom", href: "/dashboard", desc: "AI Command Center" },
    { name: "Web Search", href: "/search", desc: "Perplexity-Powered Search" },
    { name: "AI Brokerage", href: "/brokerage", desc: "Automation Services" },
    { name: "HACP Technology", href: "/hacp", desc: "Patent #10,290,222" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 glass" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/DripLogoSaintSal_.png" alt="CookinBiz" width={50} height={50} className="rounded-lg" />
            <div className="flex flex-col">
              <span className="font-display text-2xl leading-tight">
                <span className="text-white">Cookin</span>
                <span className="text-gold text-glow">Biz</span>
              </span>
              <span className="text-xs text-gray-400 font-light tracking-wide">
                by: <span className="text-gold">SaintSal.ai</span> <span className="text-gray-500">(HACP)</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {/* Ecosystem Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("ecosystem")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                Ecosystem
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === "ecosystem" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-void-light border border-gold/20 rounded-xl p-2 shadow-2xl"
                >
                  {ecosystemLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 rounded-lg hover:bg-gold/10 transition-colors"
                    >
                      <div className="text-white font-medium">{link.name}</div>
                      <div className="text-gray-400 text-sm">{link.desc}</div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {/* SaintSal Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("saintsal")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                SaintSal
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === "saintsal" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-void-light border border-gold/20 rounded-xl p-2 shadow-2xl"
                >
                  {saintSalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 rounded-lg hover:bg-gold/10 transition-colors"
                    >
                      <div className="text-white font-medium">{link.name}</div>
                      <div className="text-gray-400 text-sm">{link.desc}</div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            <Link href="/apply" className="text-white/70 hover:text-white transition-colors">
              Apply
            </Link>
            <Link href="#pricing" className="text-white/70 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-white/70 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/search" className="btn-ghost text-sm flex items-center gap-2">
              <Search size={16} />
              Search
            </Link>
            <Link href="/dashboard" className="btn-gold text-sm">
              WarRoom
            </Link>
          </div>

          <button className="md:hidden text-gold" onClick={() => setMobileOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 z-[100] bg-void"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-display text-2xl">
                  <span className="text-white">Cookin</span>
                  <span className="text-gold">Biz</span>
                </span>
                <button onClick={() => setMobileOpen(false)} className="text-gold">
                  <X size={28} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-gold text-sm font-semibold mb-2 mt-6">ECOSYSTEM</div>
                {ecosystemLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-xl text-white/80 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="text-gold text-sm font-semibold mb-2 mt-6">SAINTSAL AI</div>
                {saintSalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-xl text-white/80 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="border-t border-gold/20 my-6" />

                <Link
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-xl text-white/80 hover:text-gold transition-colors"
                >
                  Apply Now
                </Link>
                <Link
                  href="#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-xl text-white/80 hover:text-gold transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-xl text-white/80 hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  href="/search"
                  className="btn-ghost w-full text-center flex items-center justify-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Search size={18} />
                  Web Search
                </Link>
                <Link href="/dashboard" className="btn-gold w-full text-center" onClick={() => setMobileOpen(false)}>
                  Enter WarRoom
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/HOMEBG.png" alt="Background" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-gold text-sm font-medium">Home of HACP™ & SaintSal™</span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-40 h-40 mx-auto mb-8"
        >
          <Image
            src="/images/THE_BEST_MAIN_LOGO___COOKIN_copy.png"
            alt="Cookin Logo"
            width={160}
            height={160}
            className="animate-float drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl font-bold mb-6"
        >
          The <span className="text-gold-gradient">AI Operating Systems</span>
          <br />
          Powering The Future
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-white/60 max-w-2xl mx-auto mb-6"
        >
          Not chatbots. Not demos. Real AI infrastructure deployed in production. Patented technology. Trademarked
          intelligence. Enterprise-grade execution.
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <span className="px-3 py-1 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-mono">
            US Patent #10,290,222
          </span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 text-sm font-mono">
            HACP™ Protocol
          </span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 text-sm font-mono">
            SaintSal™
          </span>
        </motion.div>

        {/* App Store badges below tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap justify-center items-center gap-4 mb-10"
        >
          <a
            href="https://apps.apple.com/us/app/saintsal/id6752356451"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-xl transition-all group"
          >
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] text-white/50 uppercase tracking-wider">Download on the</div>
              <div className="text-white font-semibold group-hover:text-gold transition-colors">App Store</div>
            </div>
            <div className="ml-2 flex items-center gap-1 text-gold">
              <Star className="w-3 h-3 fill-gold" />
              <span className="text-xs font-bold">5.0</span>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.saintvision.faithfulapp&hl=en_US"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-xl transition-all group"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z"
              />
              <path fill="#34A853" d="M16.296 15.504L5.532 21.58l8.26-8.26 2.504 2.184z" />
              <path
                fill="#FBBC04"
                d="M20.39 10.836l-4.094-2.416-3.183 3.183 3.503 3.057 3.774-2.227a1.163 1.163 0 000-1.597z"
              />
              <path fill="#EA4335" d="M5.532 2.42l10.764 6.076-2.504 2.184-8.26-8.26z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] text-white/50 uppercase tracking-wider">Get it on</div>
              <div className="text-white font-semibold group-hover:text-gold transition-colors">Google Play</div>
            </div>
          </a>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://saintsal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex items-center gap-2"
          >
            <Sparkles size={18} /> Try SaintSal AI
          </a>
          <Link href="/services" className="btn-ghost flex items-center gap-2">
            View Services <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  )
}

// AboutSection Section - ADDED HERE
function AboutSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-light to-void" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">Saint Vision Technologies LLC</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-gold-gradient">Future of AI</span> is Here
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Where artificial intelligence meets divine purpose. Experience responsible AI with our patented HACP
            technology.
          </p>
        </motion.div>

        {/* Hero Image - Executive with SaintSal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden mb-16 border border-gold/20"
        >
          <Image
            src="/images/svt-saintsal-executive.png"
            alt="Saint Vision Technologies - AI Partnership"
            width={1400}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Real Estate Commissions: $1.4 Million+
                </h3>
                <p className="text-white/60">Powered by SaintSal AI Analysis</p>
              </div>
              <Link
                href="/capital"
                className="px-6 py-3 bg-gold text-black font-bold rounded-xl hover:bg-gold-light transition-all"
              >
                Start Investing
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Two Column - Office + Robot Logo */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Office Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-gold/20 group"
          >
            <Image
              src="/images/svt-office.png"
              alt="Saint Vision Technologies Headquarters"
              width={700}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h4 className="text-xl font-bold text-white mb-1">Enterprise Ready</h4>
              <p className="text-white/60 text-sm">SaintSal Console | Chat | Business | Brokerage</p>
            </div>
          </motion.div>

          {/* SaintSal Robot Logo Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-void-light to-void border border-gold/20 p-8 flex flex-col items-center justify-center"
          >
            <Image
              src="/images/saintsal-robot-logo.png"
              alt="SaintSal - Cookin Knowledge"
              width={300}
              height={300}
              className="mb-6 hover:scale-105 transition-transform duration-300"
            />
            <h4 className="text-2xl font-bold text-white mb-2">Cookin' Knowledge</h4>
            <p className="text-white/60 text-center mb-4">
              First Human-AI Protocol Agents with patented HACP technology
            </p>
            <div className="flex gap-3">
              <a
                href="https://apps.apple.com/us/app/saintsal/id6752356451"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83" />
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.saintvision.faithfulapp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gold text-black rounded-lg font-semibold text-sm hover:bg-gold-light transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zM16.5 12L6 3.5v17l10.5-8.5zm.5 0l4.5 3.5v-7L17 12z" />
                </svg>
                Google Play
              </a>
            </div>
          </motion.div>
        </div>

        {/* CookinCapital Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative rounded-2xl overflow-hidden bg-gradient-to-r from-gold/10 via-void-light to-gold/10 border border-gold/30 p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Image
                src="/images/cookin-capital-logo.png"
                alt="CookinCapital"
                width={250}
                height={60}
                className="h-12 w-auto"
              />
              <div className="hidden md:block w-px h-12 bg-gold/30" />
              <div>
                <p className="text-white/80 text-lg">Private Lending & Investment Syndicate</p>
                <p className="text-gold text-sm">Fund deals, earn returns, build wealth</p>
              </div>
            </div>
            <Link
              href="/capital"
              className="px-8 py-3 bg-gold text-black font-bold rounded-xl hover:bg-gold-light transition-all flex items-center gap-2"
            >
              Explore Capital <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// AppStore Section
function AppStoreSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-light to-void" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Now Available on Mobile</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gold-gradient">SaintSal™</span> in Your Pocket
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            The world's first Human-AI Protocol Agents. Dual AI with ChatGPT + Claude. Patented HACP technology.
            Available on iOS and Android.
          </p>
        </motion.div>

        {/* App Showcase */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* App Screenshots Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Phone Frame */}
              <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl shadow-gold/20">
                <div className="bg-void rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* Status Bar */}
                  <div className="h-8 bg-black flex items-center justify-between px-6">
                    <span className="text-white text-xs">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 border border-white rounded-sm">
                        <div className="w-3 h-1 bg-green-500 rounded-sm m-px" />
                      </div>
                    </div>
                  </div>
                  {/* App Content */}
                  <div className="p-4 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">WARROOM</div>
                        <div className="text-gold text-[10px]">DUAL AI Active</div>
                      </div>
                      <div className="ml-auto px-2 py-1 bg-green-500/20 rounded text-green-400 text-[10px]">BETA</div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 space-y-3">
                      <div className="bg-white/5 rounded-xl p-3 max-w-[80%]">
                        <p className="text-white/80 text-xs">Welcome to SAINTSAL™ WarRoom. How can I help you today?</p>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-4 h-4 rounded bg-gold/20 flex items-center justify-center">
                            <Mic className="w-2 h-2 text-gold" />
                          </div>
                          <span className="text-[10px] text-white/40">Voice enabled</span>
                        </div>
                      </div>

                      <div className="bg-gold/10 border border-gold/30 rounded-xl p-3 max-w-[80%] ml-auto">
                        <p className="text-white/80 text-xs">Analyze this property deal for me</p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-3 max-w-[80%]">
                        <p className="text-white/80 text-xs">Running analysis with Claude + GPT...</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-0.5 bg-purple-500/20 rounded text-purple-400 text-[8px]">
                            Claude
                          </span>
                          <span className="px-2 py-0.5 bg-green-500/20 rounded text-green-400 text-[8px]">GPT-4</span>
                        </div>
                      </div>
                    </div>

                    {/* Professional Tools */}
                    <div className="mt-4">
                      <div className="text-[10px] text-white/40 mb-2">Professional Tools</div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { icon: DollarSign, label: "Finance" },
                          { icon: Home, label: "Real Estate" },
                          { icon: Shield, label: "Legal" },
                          { icon: TrendingUp, label: "Analytics" },
                        ].map((tool, i) => (
                          <div key={i} className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                            <tool.icon className="w-4 h-4 text-gold" />
                            <span className="text-[8px] text-white/60">{tool.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full scale-75 -z-10" />
            </div>
          </motion.div>

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* App Header */}
            <div className="flex items-center gap-4">
              <Image
                src="/images/DripLogoSaintSal_.png"
                alt="SaintSal"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg shadow-gold/20"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">SaintSal™</h3>
                <p className="text-gold">First Human-AI Protocol Agents</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">5.0 Rating</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                { title: "Dual AI Technology", desc: "ChatGPT + Claude working together", icon: Bot },
                { title: "Patented HACP Protocol", desc: "US Patent #10,290,222", icon: Shield },
                { title: "Voice & Vision", desc: "Speak naturally, analyze images", icon: Mic },
                { title: "Enterprise Tools", desc: "Finance, Real Estate, Legal, Analytics", icon: Zap },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{feature.title}</div>
                    <div className="text-white/60 text-sm">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://apps.apple.com/us/app/saintsal/id6752356451"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-xl hover:bg-gray-100 transition-all font-semibold"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-60 uppercase">Download on the</div>
                  <div className="text-lg leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.saintvision.faithfulapp&hl=en_US"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-void-light border border-white/20 text-white rounded-xl hover:border-gold/50 transition-all font-semibold"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z"
                  />
                  <path fill="#34A853" d="M16.296 15.504L5.532 21.58l8.26-8.26 2.504 2.184z" />
                  <path
                    fill="#FBBC04"
                    d="M20.39 10.836l-4.094-2.416-3.183 3.183 3.503 3.057 3.774-2.227a1.163 1.163 0 000-1.597z"
                  />
                  <path fill="#EA4335" d="M5.532 2.42l10.764 6.076-2.504 2.184-8.26-8.26z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-60 uppercase">Get it on</div>
                  <div className="text-lg leading-tight">Google Play</div>
                </div>
              </a>
            </div>

            {/* Developer Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="text-white/40 text-sm">
                <span className="text-white/60">Developer:</span> Saint Vision Group LLC
              </div>
              <div className="text-white/40 text-sm">
                <span className="text-white/60">Category:</span> Productivity
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// NewsAndSportsSection Section - ADDED HERE
function NewsAndSportsSection() {
  const [activeTab, setActiveTab] = useState<"news" | "sports">("news")

  const sportsLeagues = [
    { id: 438, name: "NFL", icon: "🏈" },
    { id: 352, name: "NBA", icon: "🏀" },
    { id: 382, name: "NHL", icon: "🏒" },
    { id: 103, name: "MLB", icon: "⚾" },
    { id: 366, name: "MLS", icon: "⚽" },
    { id: 572, name: "NCAAF", icon: "🏈" },
  ]

  const [selectedLeague, setSelectedLeague] = useState(438)

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-sm font-medium">Live Updates</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            News & <span className="text-gold">Sports</span> Hub
          </h2>
          <p className="text-platinum/70 text-lg max-w-2xl mx-auto">
            Stay informed with real-time fintech news and live sports scores
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-obsidian/50 border border-gold/20 rounded-full p-1">
            <button
              onClick={() => setActiveTab("news")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "news" ? "bg-gold text-void font-semibold" : "text-platinum/70 hover:text-gold"
              }`}
            >
              <Newspaper className="w-5 h-5" />
              Fintech News
            </button>
            <button
              onClick={() => setActiveTab("sports")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "sports" ? "bg-gold text-void font-semibold" : "text-platinum/70 hover:text-gold"
              }`}
            >
              <Trophy className="w-5 h-5" />
              Live Sports
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "news" ? (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* RSS.app Fintech News Carousel */}
              <div className="bg-obsidian/30 border border-gold/20 rounded-2xl p-6 overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Fintech Headlines</h3>
                    <p className="text-platinum/60 text-sm">Real-time financial technology news</p>
                  </div>
                </div>

                {/* RSS.app Carousel Widget */}
                <div
                  className="rss-carousel-container"
                  dangerouslySetInnerHTML={{
                    __html: `<rss-app-carousel id="tMfOJiooUmlt4Dcy"></rss-app-carousel>`,
                  }}
                />
              </div>

              {/* News Categories */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {["Crypto", "Banking", "AI & ML", "Markets"].map((category) => (
                  <div
                    key={category}
                    className="bg-obsidian/30 border border-gold/10 rounded-xl p-4 text-center hover:border-gold/30 transition-colors cursor-pointer group"
                  >
                    <span className="text-platinum/70 group-hover:text-gold transition-colors">{category}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* League Selector */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {sportsLeagues.map((league) => (
                  <button
                    key={league.id}
                    onClick={() => setSelectedLeague(league.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 ${
                      selectedLeague === league.id
                        ? "bg-gold text-void border-gold font-semibold scale-105"
                        : "bg-obsidian/30 border-gold/20 text-platinum/70 hover:border-gold/40 hover:text-gold"
                    }`}
                  >
                    <span className="text-xl">{league.icon}</span>
                    <span>{league.name}</span>
                  </button>
                ))}
              </div>

              {/* 365Scores Widget Container */}
              <div className="bg-obsidian/30 border border-gold/20 rounded-2xl p-6 min-h-[400px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {sportsLeagues.find((l) => l.id === selectedLeague)?.name} Scores
                    </h3>
                    <p className="text-platinum/60 text-sm">Live scores and standings</p>
                  </div>
                </div>

                {/* 365Scores Widgets - Show based on selected league */}
                <div className="sports-widget-container">
                  {selectedLeague === 438 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<div data-widget-type="entityScores" data-entity-type="league" data-entity-id="438" data-lang="en" data-widget-id="bc02b374-94fd-44d0-9a73-5d5d28d875c4" data-theme="dark"></div>`,
                      }}
                    />
                  )}
                  {selectedLeague === 352 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<div data-widget-type="entityScores" data-entity-type="league" data-entity-id="352" data-lang="en" data-widget-id="87434b69-ba06-4535-925b-16c0975b5cce" data-theme="dark"></div>`,
                      }}
                    />
                  )}
                  {selectedLeague === 382 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<div data-widget-type="entityScores" data-entity-type="league" data-entity-id="382" data-lang="en" data-widget-id="6e530aa1-6038-4d9b-9f4d-4843393b0b48" data-theme="dark"></div>`,
                      }}
                    />
                  )}
                  {selectedLeague === 103 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<div data-widget-type="entityScores" data-entity-type="league" data-entity-id="103" data-lang="en" data-widget-id="7a2f8259-de15-4bae-9e90-65cde26841ff" data-theme="dark"></div>`,
                      }}
                    />
                  )}
                  {selectedLeague === 366 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<div data-widget-type="entityScores" data-entity-type="league" data-entity-id="366" data-lang="en" data-widget-id="a521273d-0d13-40f3-bfa2-d85594d8def8" data-theme="dark"></div>`,
                      }}
                    />
                  )}
                  {selectedLeague === 572 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<div data-widget-type="entityScores" data-entity-type="league" data-entity-id="572" data-lang="en" data-widget-id="ef9a9e54-af18-4027-bb9c-f4a8c013a777" data-theme="dark"></div>`,
                      }}
                    />
                  )}
                </div>

                {/* Powered by 365Scores */}
                <div className="mt-6 pt-4 border-t border-gold/10 text-center">
                  <span className="text-platinum/40 text-sm">
                    Powered by{" "}
                    <a
                      href="https://www.365scores.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold/60 hover:text-gold transition-colors"
                    >
                      365Scores.com
                    </a>
                  </span>
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-obsidian/30 border border-gold/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gold">6</div>
                  <div className="text-platinum/60 text-sm">Leagues</div>
                </div>
                <div className="bg-obsidian/30 border border-gold/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gold">Live</div>
                  <div className="text-platinum/60 text-sm">Updates</div>
                </div>
                <div className="bg-obsidian/30 border border-gold/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gold">24/7</div>
                  <div className="text-platinum/60 text-sm">Coverage</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Ecosystem Section
function EcosystemSection() {
  const platforms = [
    {
      name: "SaintSal.ai",
      tagline: "AI Operating Platform",
      description:
        "The AI Co-Founder. Multi-model orchestration with Claude, GPT, and Gemini. Voice, vision, search, and execution.",
      icon: "/images/DripLogoSaintSal_.png",
      features: ["Multi-Model AI", "Voice & Vision", "Web Search", "Enterprise Ready"],
      link: "https://saintsal.ai",
      featured: true,
    },
    {
      name: "CookinCapital",
      tagline: "Commercial Lending",
      description: "AI-powered commercial lending brokerage. Automated lender matching and term sheet generation.",
      icon: "/images/cookincaplogo.png",
      features: ["Lender Matching", "Term Sheets", "Pipeline AI"],
      link: "#contact",
    },
    {
      name: "CookinSaints RE",
      tagline: "Real Estate Division",
      description: "Our real estate investment division. Automated valuations, deal analysis, and investor portals.",
      icon: "/images/SVTLOGO_copy.png",
      features: ["Valuations", "Deal Analysis", "Investor Portal"],
      link: "#contact",
    },
    {
      name: "CapCookin.io",
      tagline: "Management System",
      description: "The command center. Full CRM, deal tracking, and team management synchronized in real-time.",
      icon: "/images/SVTLOGO_copy.png",
      features: ["CRM", "Deal Tracking", "Team Mgmt"],
      link: "https://capcookin.io",
    },
    {
      name: "CookinForeclosure",
      tagline: "Distressed Assets",
      description: "Distressed asset intelligence. Foreclosure data, auction tracking, and acquisition opportunities.",
      icon: "/images/cookincaplogo.png",
      features: ["Foreclosure Data", "Auctions", "AI Analysis"],
      link: "#contact",
    },
    {
      name: "CookinFlips",
      tagline: "Fix & Flip Platform",
      description: "Fix and flip investment platform. Deal sourcing, rehab analysis, and exit strategy optimization.",
      icon: "/images/cookincaplogo.png",
      features: ["Deal Sourcing", "Rehab Analysis", "Exit Strategy"],
      link: "#contact",
    },
  ]

  return (
    <section id="ecosystem" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="label-gold">The Ecosystem</span>
          <h2 className="font-display text-4xl md:text-5xl mt-2 mb-4">
            Your Complete <span className="text-gold">AI Infrastructure</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From commercial lending to real estate investments, from AI platforms to management systems — we've built it
            all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card-elevated p-6 ${platform.featured ? "lg:col-span-2 lg:row-span-1" : ""}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-elevated overflow-hidden">
                  <Image
                    src={platform.icon || "/placeholder.svg"}
                    alt={platform.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl text-gold">{platform.name}</h3>
                  <p className="text-white/50 text-sm">{platform.tagline}</p>
                </div>
              </div>
              <p className="text-white/70 mb-4">{platform.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {platform.features.map((feature) => (
                  <span key={feature} className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/50">
                    {feature}
                  </span>
                ))}
              </div>
              <Link
                href={platform.link}
                target={platform.link.startsWith("http") ? "_blank" : undefined}
                className="inline-flex items-center gap-2 text-gold hover:text-gold-bright transition-colors"
              >
                {platform.link.startsWith("http") ? "Launch" : "Learn More"} <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// SaintSal Demo Section
function SaintSalSection() {
  const [activeTab, setActiveTab] = useState("chat")

  const capabilities = [
    { id: "chat", icon: MessageSquare, label: "AI Chat", desc: "Multi-model intelligence" },
    { id: "voice", icon: Mic, label: "Voice", desc: "Talk to SaintSal™" },
    { id: "vision", icon: Eye, label: "Vision", desc: "Image analysis" },
    { id: "search", icon: Search, label: "Web Search", desc: "Real-time research" },
    { id: "image", icon: ImageIcon, label: "Image Gen", desc: "AI image creation" },
    { id: "video", icon: Video, label: "Video", desc: "AI video creation" },
  ]

  return (
    <section id="saintsal" className="py-24 bg-gradient-to-b from-void to-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="label-gold">SaintSal™ AI</span>
          <h2 className="font-display text-4xl md:text-5xl mt-2 mb-4">
            Meet Your <span className="text-gold">AI Co-Founder</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Not a chatbot — an operator. Voice, vision, search, image generation, and full execution capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Capabilities */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {capabilities.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => setActiveTab(cap.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                    activeTab === cap.id ? "bg-gold/10 border-gold" : "bg-card border-white/10 hover:border-white/20"
                  }`}
                >
                  <cap.icon className={`mb-2 ${activeTab === cap.id ? "text-gold" : "text-white/50"}`} size={24} />
                  <h4 className={`font-semibold ${activeTab === cap.id ? "text-gold" : "text-white"}`}>{cap.label}</h4>
                  <p className="text-xs text-white/40">{cap.desc}</p>
                </button>
              ))}
            </div>

            {/* Call to Action */}
            <div className="p-6 bg-card border border-white/10 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="text-gold" size={24} />
                <div>
                  <p className="text-white/50 text-sm">Call SaintSal™ Now</p>
                  <a href="tel:9499972097" className="text-2xl font-display text-gold hover:text-gold-bright">
                    (949) 997-2097
                  </a>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-4">
                Full voice AI with ElevenLabs. Fine-tuned and ready. Vision, voice, TTS — the real deal.
              </p>
              <div className="flex gap-3">
                <Link href="https://saintsal.ai" target="_blank" className="btn-gold flex-1 text-center">
                  Launch App
                </Link>
                <a href="tel:9499972097" className="btn-ghost flex-1 text-center">
                  <Phone size={18} className="inline mr-2" /> Call Now
                </a>
              </div>
            </div>

            {/* App Store Badges */}
            <div className="flex gap-4">
              <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                <p className="text-white/30 text-xs mb-1">🍎 App Store</p>
                <p className="text-gold text-sm font-medium">Coming Soon</p>
              </div>
              <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                <p className="text-white/30 text-xs mb-1">▶️ Play Store</p>
                <p className="text-gold text-sm font-medium">Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              <Image src="/images/SaintSal___You_copy.png" alt="SaintSal + You" fill className="object-contain" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 text-center">
              <p className="text-white/30 text-sm">
                Available on <span className="text-gold">saintsal.ai</span> and app stores
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// SaintSal Demo Section - UPDATED CONTENT
// Updated SaintSal section with WarRoom CTA
function SaintSalSectionUpdated() {
  const [activeTab, setActiveTab] = useState("chat")

  const capabilities = [
    { id: "chat", icon: MessageSquare, label: "AI Chat", desc: "Multi-model intelligence" },
    { id: "voice", icon: Mic, label: "Voice", desc: "Talk to SaintSal™" },
    { id: "vision", icon: Eye, label: "Vision", desc: "Image analysis" },
    { id: "search", icon: Search, label: "Web Search", desc: "Real-time research" },
    { id: "image", icon: ImageIcon, label: "Image Gen", desc: "AI image creation" },
    { id: "video", icon: Video, label: "Video", desc: "AI video creation" },
  ]

  return (
    <section id="saintsal" className="py-24 px-6 bg-void relative overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <a
          href="https://saintsal.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-10 py-5 rounded-xl font-semibold hover:bg-[#D4AF37]/90 transition-all text-lg shadow-lg shadow-[#D4AF37]/20"
        >
          <Sparkles className="w-5 h-5" />
          Enter WarRoom
        </a>
        <Link
          href="/properties"
          className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-10 py-5 rounded-xl font-semibold hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all text-lg"
        >
          <Building2 className="w-5 h-5" />
          Search Properties
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Capabilities */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {capabilities.map((cap) => (
              <button
                key={cap.id}
                onClick={() => setActiveTab(cap.id)}
                className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                  activeTab === cap.id ? "bg-gold/10 border-gold" : "bg-card border-white/10 hover:border-white/20"
                }`}
              >
                <cap.icon className={`mb-2 ${activeTab === cap.id ? "text-gold" : "text-white/50"}`} size={24} />
                <h4 className={`font-semibold ${activeTab === cap.id ? "text-gold" : "text-white"}`}>{cap.label}</h4>
                <p className="text-xs text-white/40">{cap.desc}</p>
              </button>
            ))}
          </div>

          {/* Call to Action */}
          <div className="p-6 bg-card border border-white/10 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Phone className="text-gold" size={24} />
              <div>
                <p className="text-white/50 text-sm">Call SaintSal™ Now</p>
                <a href="tel:9499972097" className="text-2xl font-display text-gold hover:text-gold-bright">
                  (949) 997-2097
                </a>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-4">
              Full voice AI with ElevenLabs. Fine-tuned and ready. Vision, voice, TTS — the real deal.
            </p>
            <div className="flex gap-3">
              <Link href="https://saintsal.ai" target="_blank" className="btn-gold flex-1 text-center">
                Launch App
              </Link>
              <a href="tel:9499972097" className="btn-ghost flex-1 text-center">
                <Phone size={18} className="inline mr-2" /> Call Now
              </a>
            </div>
          </div>

          {/* App Store Badges */}
          <div className="flex gap-4">
            <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl text-center">
              <p className="text-white/30 text-xs mb-1">🍎 App Store</p>
              <p className="text-gold text-sm font-medium">Coming Soon</p>
            </div>
            <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl text-center">
              <p className="text-white/30 text-xs mb-1">▶️ Play Store</p>
              <p className="text-gold text-sm font-medium">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative">
          <div className="aspect-square max-w-lg mx-auto relative">
            <Image src="/images/SaintSal___You_copy.png" alt="SaintSal + You" fill className="object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <p className="text-white/30 text-sm">
              Available on <span className="text-gold">saintsal.ai</span> and app stores
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Pre-Qual Section
function PreQualSection() {
  return (
    <section id="prequal" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="label-gold">Start Here</span>
          <h2 className="font-display text-4xl md:text-5xl mt-2 mb-4">
            Get <span className="text-gold">Pre-Qualified</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Complete this quick application to get pre-qualified for funding, services, or investment opportunities.
            This form is powered by our GHL automation system and will instantly route your application to the right
            team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-elevated p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                <Sparkles className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl text-gold">Application Form</h3>
                <p className="text-white/50 text-sm">Takes 2-3 minutes to complete</p>
              </div>
            </div>

            <iframe
              src="https://api.leadconnectorhq.com/widget/form/gPGc1pTZGRvxybqPpDRL"
              style={{
                width: "100%",
                height: "1996px",
                border: "none",
                borderRadius: "8px",
              }}
              id="inline-gPGc1pTZGRvxybqPpDRL"
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Apply Now SVG2"
              data-height="1996"
              data-layout-iframe-id="inline-gPGc1pTZGRvxybqPpDRL"
              data-form-id="gPGc1pTZGRvxybqPpDRL"
              title="Apply Now SVG2"
            />
          </div>

          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-start gap-4">
              <Shield className="text-gold flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold text-white mb-2">Your Information is Secure</h4>
                <p className="text-white/50 text-sm">
                  This form is encrypted and secured by our GHL automation system. Your information is never shared with
                  third parties and is only used to process your application and contact you about our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="https://link.msgsndr.com/js/form_embed.js" async />
    </section>
  )
}

// Services Section with Forms
function ServicesSection() {
  const [activeService, setActiveService] = useState("lending")
  const [step, setStep] = useState<"contact" | "details">("contact")

  const services = [
    {
      id: "lending",
      icon: DollarSign,
      title: "Commercial Lending",
      desc: "Get funding for your commercial real estate projects",
      formFields: ["Business Name", "Loan Amount", "Property Type", "Timeline"],
    },
    {
      id: "realestate",
      icon: Home,
      title: "Real Estate Investment",
      desc: "Join our investment opportunities",
      formFields: ["Full Name", "Investment Range", "Investment Type", "Accredited Status"],
    },
    {
      id: "investment",
      icon: TrendingUp,
      title: "Fund Investments",
      desc: "Access our managed investment funds",
      formFields: ["Full Name", "Capital Available", "Investment Horizon", "Risk Tolerance"],
    },
    {
      id: "tech",
      icon: Code,
      title: "Tech Development",
      desc: "Custom AI platform development",
      formFields: ["Company Name", "Project Type", "Budget Range", "Timeline"],
    },
  ]

  const [formData, setFormData] = useState({
    // Contact info (step 1)
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    // Service details (step 2)
    loanAmount: "",
    propertyType: "",
    timeline: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate contact info is complete
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Please fill out all contact information")
      return
    }
    setStep("details")
    setError("")
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: activeService === "lending" ? "funding" : "service",
          data: {
            ...formData,
            serviceType: services.find((s) => s.id === activeService)?.title,
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Submission failed")
      }

      setSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        loanAmount: "",
        propertyType: "",
        timeline: "",
        message: "",
      })
      setStep("contact")

      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error: any) {
      console.error("Form error:", error)
      setError(error.message || "Failed to submit. Please try again or call us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="services" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="label-gold">Our Services</span>
          <h2 className="font-display text-4xl md:text-5xl mt-2 mb-4">
            What Do You <span className="text-gold">Need?</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Commercial funding, real estate investments, or custom AI development — we've got you covered.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                setActiveService(service.id)
                setStep("contact")
                setError("")
              }}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-300 ${
                activeService === service.id
                  ? "bg-gold/10 border-gold text-gold"
                  : "bg-card border-white/10 text-white/70 hover:border-white/20"
              }`}
            >
              <service.icon size={20} />
              <span className="font-medium">{service.title}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-elevated p-8 text-center"
            >
              <CheckCircle2 className="text-gold mx-auto mb-4" size={64} />
              <h3 className="font-display text-2xl text-gold mb-2">Inquiry Submitted!</h3>
              <p className="text-white/70 mb-2">
                Thank you for your interest in {services.find((s) => s.id === activeService)?.title}.
              </p>
              <p className="text-white/50 text-sm">
                We'll review your inquiry and reach out within 24 hours via email or phone.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setStep("contact")
                }}
                className="btn-gold mt-6"
              >
                Submit Another Inquiry
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeService}-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-elevated p-8"
            >
              <div className="mb-6">
                <h3 className="font-display text-2xl text-gold mb-2">
                  {services.find((s) => s.id === activeService)?.title}
                </h3>
                <p className="text-white/50">{services.find((s) => s.id === activeService)?.desc}</p>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    step === "contact" ? "bg-gold/20 text-gold" : "bg-white/5 text-white/50"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-gold text-void font-bold flex items-center justify-center text-sm">
                    1
                  </div>
                  <span className="text-sm font-medium">Contact Info</span>
                </div>
                <div className="flex-1 h-px bg-white/10" />
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    step === "details" ? "bg-gold/20 text-gold" : "bg-white/5 text-white/50"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full ${step === "details" ? "bg-gold text-void" : "bg-white/10 text-white/50"} font-bold flex items-center justify-center text-sm`}
                  >
                    2
                  </div>
                  <span className="text-sm font-medium">Service Details</span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {step === "contact" ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label-gold mb-2 block">First Name *</label>
                      <input
                        type="text"
                        className="input-dark"
                        placeholder="John"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label-gold mb-2 block">Last Name *</label>
                      <input
                        type="text"
                        className="input-dark"
                        placeholder="Smith"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-gold mb-2 block">Email *</label>
                    <input
                      type="email"
                      className="input-dark"
                      placeholder="john@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-gold mb-2 block">Phone *</label>
                    <input
                      type="tel"
                      className="input-dark"
                      placeholder="(949) 416-9971"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-gold mb-2 block">Company</label>
                    <input
                      type="text"
                      className="input-dark"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full">
                    Continue to Service Details <ArrowRight size={18} className="inline ml-2" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  {activeService === "lending" && (
                    <>
                      <div>
                        <label className="label-gold mb-2 block">Loan Amount *</label>
                        <input
                          type="text"
                          className="input-dark"
                          placeholder="$500,000"
                          required
                          value={formData.loanAmount}
                          onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="label-gold mb-2 block">Property Type *</label>
                        <select
                          className="input-dark"
                          required
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        >
                          <option value="">Select property type</option>
                          <option value="multifamily">Multifamily</option>
                          <option value="office">Office</option>
                          <option value="retail">Retail</option>
                          <option value="industrial">Industrial</option>
                          <option value="mixed-use">Mixed Use</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="label-gold mb-2 block">Timeline *</label>
                        <select
                          className="input-dark"
                          required
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Immediate (1-2 weeks)</option>
                          <option value="30days">30 days</option>
                          <option value="60days">60 days</option>
                          <option value="90days">90+ days</option>
                        </select>
                      </div>
                    </>
                  )}
                  <div>
                    <label className="label-gold mb-2 block">Additional Details *</label>
                    <textarea
                      className="input-dark min-h-[120px]"
                      placeholder="Tell us more about your project or needs..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep("contact")} className="btn-secondary flex-1">
                      Back
                    </button>
                    <button type="submit" disabled={isSubmitting} className="btn-gold flex-1 disabled:opacity-50">
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                      <ArrowRight size={18} className="inline ml-2" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

// Affiliate Section
function AffiliateSection() {
  return (
    <section id="affiliate" className="py-24 bg-gradient-to-b from-dark to-void relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="label-gold">Affiliate Program</span>
          <h2 className="font-display text-4xl md:text-5xl mt-2 mb-4">
            Earn With <span className="text-gold">CookinBiz</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Join our affiliate program and earn recurring commissions. 50/50 splits between VPs and affiliates.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <stripe-pricing-table
            pricing-table-id="prctbl_1SdRPDGVzsQbCDmmkq0uSbIX"
            publishable-key="pk_live_51SGbmHGVzsQbCDmmc3GGBQKTrxEWfXJBw2wCZqPNJITuNcZdBI8uQa04BkWxBloqDq2fJmKuF2Z5o4MFO0o7uAJU009bQ0K6pw"
          />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: DollarSign,
              title: "Recurring Revenue",
              desc: "Earn monthly as long as your referrals stay active",
            },
            { icon: Users, title: "Marketing Tools", desc: "AI-powered content creation for social, email & video" },
            { icon: Star, title: "VP Opportunity", desc: "Advance to VP and earn on your entire team" },
          ].map((feature) => (
            <div key={feature.title} className="card-elevated p-6 text-center">
              <feature.icon className="mx-auto text-gold mb-4" size={32} />
              <h3 className="font-display text-lg mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="#contact" className="btn-gold inline-flex items-center gap-2">
            Become an Affiliate <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// GHL Pro Section
function GHLProSection() {
  return (
    <section className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Original GHL Pro Section Content */}
          <div>
            <span className="label-gold">GoHighLevel Pro</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2 mb-4">
              The Complete <span className="text-gold">Business System</span>
            </h2>
            <p className="text-white/50 mb-8">
              Powered by GoHighLevel, supercharged with SaintSal™. CRM, automation, funnels, websites, email, SMS —
              everything you need.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Zap, title: "Unlimited Everything", desc: "Contacts, funnels, websites, automations" },
                { icon: Bot, title: "AI Integration", desc: "SaintSal™ built into your workflows" },
                { icon: Shield, title: "Full API Access", desc: "Connect anything, automate everything" },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-white/50 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="https://www.gohighlevel.com/?fp_ref=cookin"
              target="_blank"
              className="btn-gold inline-flex items-center gap-2"
            >
              Get GHL Pro <ArrowRight size={18} />
            </Link>
          </div>

          <div className="space-y-4">
            {/* SaintSal PRO - Main Offer */}
            <div className="card-elevated p-8 text-center border-2 border-gold relative overflow-hidden">
              {/* Best Value Badge */}
              <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                BEST VALUE
              </div>

              <Image
                src="/images/SVTLOGO_copy.png"
                alt="SaintSal PRO"
                width={150}
                height={150}
                className="mx-auto mb-6"
              />

              <div className="mb-4">
                <div className="text-lg text-gold font-semibold mb-2">SaintSal™ PRO</div>
                <div className="text-6xl font-display text-gold mb-2">
                  $97<span className="text-xl text-white/50">/mo</span>
                </div>
                <p className="text-white/70 mb-2">Includes FULL GHL PRO Account</p>
                <p className="text-white/50 text-sm mb-4">Same price as GHL alone - but you get BOTH!</p>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-gold" size={18} />
                  <span className="text-white font-semibold text-sm">What's Included:</span>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-gold">✓</span>
                    <span>Full GoHighLevel PRO Account ($297 value)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">✓</span>
                    <span>SaintSal AI Platform Access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">✓</span>
                    <span>Unlimited Everything - No Per-Seat Fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">✓</span>
                    <span>24/7 Cookin' Knowledge Support</span>
                  </li>
                </ul>
              </div>

              <Link
                href="https://www.gohighlevel.com/?fp_ref=cookin"
                target="_blank"
                className="btn-gold w-full text-lg py-4"
              >
                Start Your Trial - Just $97/mo
              </Link>
            </div>

            <div className="card-elevated p-8 text-center border-2 border-white/30 relative overflow-hidden">
              {/* Teams Badge */}
              <div className="absolute top-4 right-4 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
                5 SEATS
              </div>

              {/* Savings Callout */}
              <div className="absolute top-4 left-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                SAVE $188/mo
              </div>

              <div className="w-[150px] h-[150px] mx-auto mb-6 flex items-center justify-center">
                <div className="relative">
                  <Users className="w-20 h-20 text-white/80" />
                  <div className="absolute -bottom-2 -right-2 bg-gold text-black text-xs font-bold px-2 py-1 rounded-full">
                    x5
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-lg text-white font-semibold mb-2">SaintSal™ TEAMS</div>
                <div className="text-6xl font-display text-white mb-2">
                  $297<span className="text-xl text-white/50">/mo</span>
                </div>
                <p className="text-white/70 mb-2">5 Full PRO Seats Included</p>
                <p className="text-white/50 text-sm mb-4">That's like getting 2 seats FREE! ($97 x 5 = $485)</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-white/80" size={18} />
                  <span className="text-white font-semibold text-sm">Team Benefits:</span>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-gold">✓</span>
                    <span>5 Full SaintSal PRO + GHL PRO Accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">✓</span>
                    <span>Team Collaboration & Shared Workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">✓</span>
                    <span>Priority Support & Dedicated Success Manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">✓</span>
                    <span>Advanced Analytics & Team Reporting</span>
                  </li>
                </ul>
              </div>

              <Link
                href="https://www.gohighlevel.com/?fp_ref=cookin"
                target="_blank"
                className="btn-outline w-full text-lg py-4 border-white/30 hover:bg-white/10"
              >
                Scale Your Team - 5 for $297/mo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Added phone field
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          data: formData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Submission failed")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })

      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error: any) {
      console.error("Form error:", error)
      setError(error.message || "Failed to submit. Please try again or call us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-24 bg-void relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <span className="label-gold">Let's Build</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2 mb-4">
              Ready to <span className="text-gold">Transform?</span>
            </h2>
            <p className="text-white/50 mb-8">
              Whether you need funding, AI infrastructure, or want to license our technology — let's talk.
            </p>

            <div className="space-y-4">
              <a
                href="tel:9494169971"
                className="flex items-center gap-4 p-4 card-elevated hover:border-gold/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Phone className="text-gold" size={24} />
                </div>
                <div>
                  <p className="label-gold">Direct Line</p>
                  <p className="text-white text-lg">(949) 416-9971</p>
                </div>
              </a>
              <a
                href="mailto:support@cookin.io"
                className="flex items-center gap-4 p-4 card-elevated hover:border-gold/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Mail className="text-gold" size={24} />
                </div>
                <div>
                  <p className="label-gold">Email Us</p>
                  <p className="text-white text-lg">support@cookin.io</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card p-8 rounded-xl">
            <h3 className="font-display text-2xl text-gold mb-4">Get in Touch</h3>
            {submitted ? (
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 text-center">
                <CheckCircle2 className="text-gold mx-auto mb-3" size={48} />
                <h4 className="text-xl text-gold font-semibold mb-2">Message Sent!</h4>
                <p className="text-white/70 mb-2">We'll get back to you within 24 hours.</p>
                <p className="text-white/50 text-sm">Check your email and phone for confirmation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label className="label-gold mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label className="label-gold mb-2 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="label-gold mb-2 block">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="(949) 416-9971"
                    required
                  />
                </div>
                <div>
                  <label className="label-gold mb-2 block">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-dark min-h-[120px]"
                    placeholder="Tell us about your project or needs..."
                    required
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-gold w-full disabled:opacity-50">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight size={18} className="inline ml-2" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Main() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <AppStoreSection />
      <NewsAndSportsSection />
      <EcosystemSection />
      <SaintSalSection /> {/* Use the original SaintSalSection here */}
      <PreQualSection />
      <ServicesSection />
      <AffiliateSection />
      <GHLProSection />
      <ContactSection />
    </>
  )
}

export default Main
