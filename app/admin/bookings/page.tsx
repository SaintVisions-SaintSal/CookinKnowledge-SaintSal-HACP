"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import {
  Calendar,
  Search,
  Check,
  X,
  Loader2,
  Menu,
  LogOut,
  Users,
  MessageSquare,
  ShoppingBag,
  BarChart3,
} from "lucide-react"

type Booking = {
  id: string
  athlete_name: string
  parent_name: string
  parent_email: string
  parent_phone: string
  booking_date: string
  status: string
  notes: string
  created_at: string
  programs: {
    name: string
    duration_minutes: number
    price: number
  }
}

export default function AdminBookingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login?redirect=/admin/bookings")
      return
    }

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    if (!profile?.is_admin) {
      router.push("/dashboard")
      return
    }

    setUser(user)
    await loadBookings()
    setLoading(false)
  }

  const loadBookings = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("bookings")
      .select(`*, programs (name, duration_minutes, price)`)
      .order("created_at", { ascending: false })

    if (data) {
      setBookings(data)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const supabase = createClient()
    await supabase.from("bookings").update({ status }).eq("id", bookingId)

    await loadBookings()
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.athlete_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.parent_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.parent_email?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-0"} bg-card border-r border-white/10 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/DripLogoSaintSal_.png" alt="CookinBiz" width={40} height={40} className="rounded-lg" />
            <div>
              <h1 className="font-display text-lg">
                <span className="text-white">Cookin</span>
                <span className="text-gold">Biz</span>
              </h1>
              <p className="text-xs text-white/40">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white/70 hover:text-white rounded-lg transition-colors"
          >
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/contacts"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white/70 hover:text-white rounded-lg transition-colors"
          >
            <MessageSquare size={20} />
            <span>Contacts</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white/70 hover:text-white rounded-lg transition-colors"
          >
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 bg-gold/10 text-gold rounded-lg transition-colors"
          >
            <Calendar size={20} />
            <span>Bookings</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white/70 hover:text-white rounded-lg transition-colors"
          >
            <ShoppingBag size={20} />
            <span>Orders</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full p-2 bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-card/50">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg">
              <Menu className="text-white/70" size={20} />
            </button>
            <h2 className="font-display text-xl">Booking Management</h2>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Bookings Table */}
          <div className="card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-white/50 text-sm font-medium">Athlete</th>
                    <th className="text-left p-4 text-white/50 text-sm font-medium">Program</th>
                    <th className="text-left p-4 text-white/50 text-sm font-medium">Date</th>
                    <th className="text-left p-4 text-white/50 text-sm font-medium">Status</th>
                    <th className="text-left p-4 text-white/50 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-white/5 hover:bg-white/5">
                      <td className="p-4">
                        <p className="text-white font-medium">{booking.athlete_name}</p>
                        <p className="text-white/50 text-sm">{booking.parent_email}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-white">{booking.programs?.name || "N/A"}</p>
                        <p className="text-gold text-sm">${booking.programs?.price || 0}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-white">{new Date(booking.booking_date).toLocaleDateString()}</p>
                        <p className="text-white/50 text-sm">{new Date(booking.booking_date).toLocaleTimeString()}</p>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : booking.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : booking.status === "completed"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateBookingStatus(booking.id, "confirmed")}
                            className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <Check size={16} className="text-emerald-400" />
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <X size={16} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar size={48} className="text-white/20 mx-auto mb-4" />
                <p className="text-white/40">No bookings found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
