export default function Loading() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 border-3 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground">Loading bookings...</p>
      </div>
    </div>
  )
}
