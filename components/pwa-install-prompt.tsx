"use client"

import { useState, useEffect } from "react"
import { Download, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after 3 seconds
      setTimeout(() => setShowPrompt(true), 3000)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[420px] z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-gradient-to-br from-black via-black/95 to-gold/10 border-2 border-gold/50 rounded-2xl p-6 shadow-2xl backdrop-blur-lg">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full" />
            <Image
              src="/images/cookincaplogo.png"
              alt="Cookin' Knowledge"
              width={80}
              height={80}
              className="relative"
            />
          </div>

          {/* Title with badge */}
          <div className="mb-2">
            <div className="inline-flex items-center gap-2 bg-gold/10 px-3 py-1 rounded-full mb-3">
              <Sparkles className="text-gold" size={14} />
              <span className="text-gold text-xs font-bold">RESPONSIBLE INTELLIGENCE</span>
            </div>
            <h3 className="font-display text-2xl text-white mb-1">Install CookinBiz App</h3>
            <p className="text-gold text-sm font-semibold">Cookin' Knowledge 24/7</p>
          </div>

          <p className="text-white/70 text-sm mb-6 max-w-sm">
            Get instant access to SaintSal AI, GHL PRO features, funding, and all our services right from your home
            screen.
          </p>

          <div className="flex flex-col gap-3 w-full">
            <Button onClick={handleInstall} className="btn-gold w-full text-base py-6 font-semibold">
              <Download className="mr-2" size={20} />
              Install App Now
            </Button>
            <Button onClick={handleDismiss} variant="ghost" className="text-white/60 hover:text-white text-sm">
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
