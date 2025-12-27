"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Application error:", error)
    console.error("[v0] Error message:", error.message)
    console.error("[v0] Error stack:", error.stack)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gold">Something went wrong</h1>
          <p className="text-muted-foreground">We apologize for the inconvenience. Our team has been notified.</p>
          <p className="text-xs text-red-400 mt-4 p-2 bg-red-900/20 rounded">Error: {error.message}</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={reset} className="bg-gold hover:bg-gold/90 text-black">
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
