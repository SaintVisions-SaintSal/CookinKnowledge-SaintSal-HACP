"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Send,
  Globe,
  Sparkles,
  ExternalLink,
  Copy,
  CheckCircle2,
  Loader2,
  MessageSquare,
  ArrowRight,
  Zap,
  BookOpen,
  TrendingUp,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface SearchResult {
  answer: string
  citations: string[]
  relatedQuestions: string[]
}

export default function WebSearchPage() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult | null>(null)
  const [searchHistory, setSearchHistory] = useState<Array<{ query: string; answer: string }>>([])
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestedSearches = [
    "What are the best practices for commercial real estate investing?",
    "How does AI automation improve business operations?",
    "What is HACP and how does it work?",
    "Current trends in private lending and alternative financing",
    "How to evaluate a real estate syndication deal",
  ]

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query
    if (!q.trim()) return

    setIsSearching(true)
    setResults(null)

    try {
      const response = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      })

      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()

      setResults({
        answer: data.answer,
        citations: data.citations || [],
        relatedQuestions: data.relatedQuestions || [],
      })

      setSearchHistory((prev) => [{ query: q, answer: data.answer }, ...prev.slice(0, 4)])
    } catch (error) {
      console.error("Search error:", error)
      setResults({
        answer: "I apologize, but I encountered an error while searching. Please try again.",
        citations: [],
        relatedQuestions: [],
      })
    } finally {
      setIsSearching(false)
    }
  }

  const copyToClipboard = () => {
    if (results?.answer) {
      navigator.clipboard.writeText(results.answer)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-void via-elevated to-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 glass">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/cookincap.png" alt="SaintSal" width={40} height={40} className="rounded-lg" />
            <div className="flex flex-col">
              <span className="font-display text-xl">
                <span className="text-white">SaintSal</span>
                <span className="text-gold">Search</span>
              </span>
              <span className="text-[10px] text-white/40">Powered by Perplexity AI</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors text-sm">
              WarRoom
            </Link>
            <Link href="/" className="btn-gold text-sm">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Search Section */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-8 h-8 text-gold" />
            <Sparkles className="w-6 h-6 text-gold animate-pulse" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl mb-4">
            Web Search with <span className="text-gold">SaintSal</span>
          </h1>
          <p className="text-lg text-white/60 mb-8">
            AI-powered research assistant. Get comprehensive answers with citations from across the web.
          </p>

          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center gap-2 p-2 bg-elevated border border-white/10 rounded-2xl focus-within:border-gold/50 transition-colors">
              <Search className="w-5 h-5 text-white/40 ml-3" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Ask anything... research, analysis, market trends..."
                className="flex-1 bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-white/30"
              />
              <Button
                onClick={() => handleSearch()}
                disabled={isSearching || !query.trim()}
                className="bg-gold hover:bg-gold-bright text-void rounded-xl px-6"
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Suggested Searches */}
          {!results && !isSearching && (
            <div className="mt-8">
              <p className="text-sm text-white/40 mb-4">Try searching:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedSearches.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(suggestion)
                      handleSearch(suggestion)
                    }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:border-gold/50 hover:text-white transition-colors"
                  >
                    {suggestion.length > 50 ? suggestion.substring(0, 50) + "..." : suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Loading State */}
      {isSearching && (
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-elevated border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-gold animate-spin" />
                </div>
                <div>
                  <h3 className="font-display text-xl mb-1">Searching the web...</h3>
                  <p className="text-white/50">SaintSal is gathering information from multiple sources</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-4 bg-white/5 rounded animate-pulse" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-4/6" />
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Results */}
      {results && !isSearching && (
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Answer Card */}
            <Card className="p-8 bg-elevated border-gold/30">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg">SaintSal Answer</h3>
                    <p className="text-xs text-white/40">Powered by Perplexity AI</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-white/50 hover:text-white">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="prose prose-invert prose-gold max-w-none">
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{results.answer}</p>
              </div>
            </Card>

            {/* Citations */}
            {results.citations && results.citations.length > 0 && (
              <Card className="p-6 bg-elevated border-white/10">
                <h4 className="font-display text-lg mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" />
                  Sources
                </h4>
                <div className="space-y-2">
                  {results.citations.map((citation, index) => (
                    <a
                      key={index}
                      href={citation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                      <span className="w-6 h-6 rounded bg-gold/20 flex items-center justify-center text-xs text-gold">
                        {index + 1}
                      </span>
                      <span className="flex-1 text-sm text-white/70 truncate group-hover:text-white">{citation}</span>
                      <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-gold" />
                    </a>
                  ))}
                </div>
              </Card>
            )}

            {/* Related Questions */}
            {results.relatedQuestions && results.relatedQuestions.length > 0 && (
              <Card className="p-6 bg-elevated border-white/10">
                <h4 className="font-display text-lg mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gold" />
                  Related Questions
                </h4>
                <div className="space-y-2">
                  {results.relatedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(question)
                        handleSearch(question)
                      }}
                      className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group flex items-center gap-3"
                    >
                      <ArrowRight className="w-4 h-4 text-gold" />
                      <span className="text-sm text-white/70 group-hover:text-white">{question}</span>
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Features */}
      {!results && !isSearching && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-center mb-12">
              Powered by <span className="text-gold">Advanced AI</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-elevated border-white/10">
                <Globe className="w-10 h-10 text-gold mb-4" />
                <h3 className="font-display text-xl mb-2">Real-Time Web Search</h3>
                <p className="text-white/60">
                  Access the latest information from across the internet with real-time search capabilities.
                </p>
              </Card>
              <Card className="p-6 bg-elevated border-white/10">
                <FileText className="w-10 h-10 text-gold mb-4" />
                <h3 className="font-display text-xl mb-2">Cited Sources</h3>
                <p className="text-white/60">
                  Every answer comes with citations so you can verify and explore the source material.
                </p>
              </Card>
              <Card className="p-6 bg-elevated border-white/10">
                <TrendingUp className="w-10 h-10 text-gold mb-4" />
                <h3 className="font-display text-xl mb-2">Research Analysis</h3>
                <p className="text-white/60">
                  Get comprehensive analysis and insights on market trends, business strategies, and more.
                </p>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-6 bg-void">
        <div className="max-w-4xl mx-auto text-center">
          <Zap className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl mb-4">
            Ready for More <span className="text-gold">Power?</span>
          </h2>
          <p className="text-white/60 mb-8">
            Unlock the full SaintSal experience with chat, voice, document analysis, and more.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard" className="btn-gold">
              Enter WarRoom
            </Link>
            <Link href="/" className="btn-ghost">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
