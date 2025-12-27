"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Critical Error</h1>
            <p>Something went critically wrong. Please refresh the page.</p>
            <button onClick={reset} className="px-6 py-3 bg-gold text-black rounded-lg hover:bg-gold/90">
              Reset Application
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
