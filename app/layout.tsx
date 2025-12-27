import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { AnalyticsProvider } from "@/components/analytics-provider"

export const metadata: Metadata = {
  title: {
    default: "Responsible Intelligence - Cookin' Knowledge 24/7",
    template: "%s | Cookin' Knowledge",
  },
  description:
    "Responsible Intelligence - Cookin' Knowledge 24/7. AI Operating Systems Powering the Next Generation with SaintSal AI, CookinCapital, and Saint Vision Technologies.",
  keywords: [
    "AI",
    "SaintSal",
    "Cookin Knowledge",
    "Responsible Intelligence",
    "CookinCapital",
    "Commercial Lending",
    "Saint Vision Technologies",
    "AI Platform",
    "24/7 AI Assistant",
  ],
  authors: [{ name: "Saint Vision Technologies" }],
  creator: "Saint Vision Technologies LLC",
  publisher: "Saint Vision Technologies LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cookinbiz.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Responsible Intelligence - Cookin' Knowledge 24/7",
    description: "AI Operating Systems Powering the Next Generation with SaintSal AI and CookinCapital.",
    url: "https://cookinbiz.com",
    siteName: "Cookin' Knowledge",
    images: [
      {
        url: "/icon-512.png",
        width: 1200,
        height: 630,
        alt: "Cookin' Knowledge - Responsible Intelligence 24/7",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Responsible Intelligence - Cookin' Knowledge 24/7",
    description: "AI Operating Systems Powering the Next Generation.",
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#d4af37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Rewardful tracking script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`,
          }}
        />
        <script async src="https://r.wdfl.co/rw.js" data-rewardful="YOUR_REWARDFUL_API_KEY" />
        {/* Apollo Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"67f847b15d4e8f0011b44c34"})},
document.head.appendChild(o)}initApollo();`,
          }}
        />
        {/* GHL Tracking */}
        <script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_536af3445cba47f7bccd6946e71526bc"
          async
        />
        <script src="https://link.msgsndr.com/js/form_embed.js" async />
        {/* Stripe Pricing Table script */}
        <script async src="https://js.stripe.com/v3/pricing-table.js" />
        <script src="https://widget.rss.app/v1/carousel.js" async />
        <script src="https://widgets.365scores.com/main.js" async />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('[v0] Service Worker registered'))
                    .catch(err => console.log('[v0] Service Worker registration failed:', err));
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-void antialiased">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
        <div className="fixed inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none z-0" />

        {/* Main Content */}
        <AnalyticsProvider>
          <main className="relative z-10">{children}</main>
        </AnalyticsProvider>

        <PWAInstallPrompt />

        {/* Toast Notifications */}
        <Toaster />
      </body>
    </html>
  )
}
