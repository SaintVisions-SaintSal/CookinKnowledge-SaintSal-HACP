export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-yellow-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-3xl">🍳</span>
        </div>
        <p className="text-muted-foreground">Loading Deal Pipeline...</p>
      </div>
    </div>
  )
}
