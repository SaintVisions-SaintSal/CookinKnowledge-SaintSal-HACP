"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useChat } from "ai/react"
import {
  Sparkles,
  Send,
  Loader2,
  Menu,
  Plus,
  Settings,
  User,
  Zap,
  Brain,
  ChevronDown,
  Copy,
  Check,
  Calculator,
  Code2,
  FileText,
  Shield,
  Home,
  TrendingUp,
  Briefcase,
  Building2,
  Volume2,
  VolumeX,
  X,
  Search,
  Phone,
} from "lucide-react"

type Model = "claude" | "gpt" | "grok"

const MODEL_CONFIG = {
  claude: {
    name: "Claude Sonnet 4",
    icon: Brain,
    description: "Most capable for complex reasoning",
    color: "from-purple-500 to-violet-600",
    badge: "RECOMMENDED",
  },
  gpt: {
    name: "GPT-4o",
    icon: Sparkles,
    description: "Fast and versatile",
    color: "from-emerald-500 to-teal-600",
    badge: "FAST",
  },
  grok: {
    name: "Grok Beta",
    icon: Zap,
    description: "Real-time knowledge",
    color: "from-orange-500 to-red-600",
    badge: "REAL-TIME",
  },
}

const QUICK_ACTIONS = [
  {
    icon: Calculator,
    label: "Analyze Financials",
    prompt: "Help me analyze financial statements and metrics for a commercial property investment",
  },
  { icon: Code2, label: "Write Code", prompt: "Help me write clean, efficient code for" },
  { icon: FileText, label: "Draft Document", prompt: "Help me draft a professional business document for" },
  {
    icon: Building2,
    label: "Real Estate Analysis",
    prompt: "Analyze this real estate investment opportunity and provide detailed insights on",
  },
  { icon: TrendingUp, label: "Market Research", prompt: "Conduct comprehensive market research on" },
  { icon: Briefcase, label: "Business Strategy", prompt: "Help me develop a winning business strategy for" },
]

const CAPABILITIES = [
  { icon: Brain, title: "IQ 157 Intelligence", desc: "Multi-domain strategic analysis" },
  { icon: Zap, title: "Instant Solutions", desc: "Real-time problem solving" },
  { icon: Shield, title: "HACP Powered", desc: "US Patent #10,290,222" },
]

export default function DashboardPage() {
  const [selectedModel, setSelectedModel] = useState<Model>("claude")
  const [showModelSelector, setShowModelSelector] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isPlayingVoice, setIsPlayingVoice] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Use the AI SDK useChat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages, append, stop } = useChat({
    api: "/api/ai/chat",
    body: {
      model: selectedModel,
    },
    onError: (error) => {
      console.error("[v0] Chat error:", error)
    },
  })

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Copy message to clipboard
  const copyToClipboard = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Play voice with ElevenLabs
  const playVoice = async (text: string) => {
    if (isPlayingVoice) return
    setIsPlayingVoice(true)

    try {
      const response = await fetch("/api/ai/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceId: "pNInz6obpgDQGcFmaJgB" }), // Adam voice
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        audio.onended = () => setIsPlayingVoice(false)
        audio.play()
      }
    } catch (error) {
      console.error("[v0] Voice error:", error)
    } finally {
      setIsPlayingVoice(false)
    }
  }

  // Handle quick action click
  const handleQuickAction = (prompt: string) => {
    append({ role: "user", content: prompt })
  }

  // New chat
  const handleNewChat = () => {
    setMessages([])
  }

  return (
    <div className="h-screen flex bg-void overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-72" : "w-0"} bg-elevated border-r border-white/10 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image src="/images/DripLogoSaintSal_.png" alt="SaintSal" width={40} height={40} className="rounded-lg" />
            <div>
              <span className="font-display text-lg text-gold">SaintSal</span>
              <p className="text-xs text-white/40">WarRoom</p>
            </div>
          </Link>
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors"
          >
            <Plus size={18} />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Navigation</div>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Search size={18} />
            <span>Web Search</span>
          </Link>
          <Link
            href="/capital"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Building2 size={18} />
            <span>CookinCapital</span>
          </Link>
          <Link
            href="/real-estate"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <TrendingUp size={18} />
            <span>Real Estate</span>
          </Link>
          <Link
            href="/brokerage"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Briefcase size={18} />
            <span>AI Brokerage</span>
          </Link>

          <div className="text-xs text-white/30 uppercase tracking-wider mt-6 mb-2">Quick Contact</div>
          <a
            href="tel:9494169971"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gold hover:bg-gold/10 transition-colors"
          >
            <Phone size={18} />
            <span>(949) 416-9971</span>
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-elevated/50 backdrop-blur">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-white/70" />
            </button>
            <div>
              <h1 className="font-display text-xl">
                <span className="text-white">War</span>
                <span className="text-gold">Room</span>
              </h1>
              <p className="text-xs text-white/40">SaintSal AI Command Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                {(() => {
                  const Icon = MODEL_CONFIG[selectedModel].icon
                  return <Icon size={18} className="text-gold" />
                })()}
                <span className="text-sm font-medium">{MODEL_CONFIG[selectedModel].name}</span>
                <ChevronDown size={16} className="text-white/50" />
              </button>

              {showModelSelector && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-elevated border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  {(Object.entries(MODEL_CONFIG) as [Model, (typeof MODEL_CONFIG)[Model]][]).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedModel(key)
                        setShowModelSelector(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
                        selectedModel === key ? "bg-gold/10" : ""
                      }`}
                    >
                      <config.icon size={20} className={selectedModel === key ? "text-gold" : "text-white/50"} />
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${selectedModel === key ? "text-gold" : "text-white"}`}>
                            {config.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-white/50">
                            {config.badge}
                          </span>
                        </div>
                        <p className="text-xs text-white/40">{config.description}</p>
                      </div>
                      {selectedModel === key && <Check size={16} className="text-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-lg transition-colors ${voiceEnabled ? "bg-gold/20 text-gold" : "bg-white/5 text-white/50 hover:text-white"}`}
              title={voiceEnabled ? "Disable voice" : "Enable voice"}
            >
              {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto text-center">
              <Image
                src="/images/DripLogoSaintSal_.png"
                alt="SaintSal"
                width={80}
                height={80}
                className="mb-6 animate-float"
              />
              <h2 className="font-display text-3xl mb-2">
                Hello from <span className="text-gold">SaintSal</span>!
              </h2>
              <p className="text-white/50 mb-8 max-w-lg">
                Welcome to the WarRoom - Cookin' Knowledge! How can I help you today?
              </p>

              {/* Capabilities */}
              <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-lg">
                {CAPABILITIES.map((cap) => (
                  <div key={cap.title} className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                    <cap.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                    <h3 className="text-sm font-medium text-white">{cap.title}</h3>
                    <p className="text-xs text-white/40">{cap.desc}</p>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="w-full max-w-2xl">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Quick Actions</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-left hover:border-gold/30 hover:bg-gold/5 transition-colors group"
                    >
                      <action.icon className="w-5 h-5 text-gold/70 group-hover:text-gold" />
                      <span className="text-sm text-white/70 group-hover:text-white">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Messages
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-gold" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.role === "user"
                          ? "bg-gold text-void rounded-br-md"
                          : "bg-white/5 border border-white/10 rounded-bl-md"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="p-1.5 hover:bg-white/10 rounded transition-colors"
                          title="Copy"
                        >
                          {copiedId === message.id ? (
                            <Check size={14} className="text-green-500" />
                          ) : (
                            <Copy size={14} className="text-white/40" />
                          )}
                        </button>
                        {voiceEnabled && (
                          <button
                            onClick={() => playVoice(message.content)}
                            disabled={isPlayingVoice}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors"
                            title="Play voice"
                          >
                            <Volume2
                              size={14}
                              className={isPlayingVoice ? "text-gold animate-pulse" : "text-white/40"}
                            />
                          </button>
                        )}
                        <span className="text-xs text-white/30 ml-2">{MODEL_CONFIG[selectedModel].name}</span>
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white/50" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                  </div>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-gold" />
                      <span className="text-white/50">SaintSal is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error display */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error.message}</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-elevated/50 backdrop-blur">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e as any)
                    }
                  }}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl resize-none focus:outline-none focus:border-gold/50 transition-colors text-white placeholder:text-white/30"
                  style={{ minHeight: "48px", maxHeight: "200px" }}
                />
              </div>
              {isLoading ? (
                <button
                  type="button"
                  onClick={stop}
                  className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <X size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-3 bg-gold text-void rounded-xl hover:bg-gold-bright transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
