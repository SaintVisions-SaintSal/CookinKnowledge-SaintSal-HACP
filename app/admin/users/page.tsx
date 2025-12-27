"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import {
  Users,
  Search,
  Mail,
  Phone,
  Loader2,
  Menu,
  LogOut,
  Calendar,
  MessageSquare,
  ShoppingBag,
  BarChart3,
  User,
  Crown,
} from "lucide-react"

type Profile = {
  id: string
  email: string
  full_name: string
  phone: string
  is_admin: boolean
  created_at: string
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
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
      router.push("/login?redirect=/admin/users")
      return
    }

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    if (!profile?.is_admin) {
      router.push("/dashboard")
      return
    }

    setUser(user)
    await loadProfiles()
    setLoading(false)
  }

  const loadProfiles = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

    if (data) {
      setProfiles(data)
    }
  }

  const toggleAdmin = async (profileId: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase.from("profiles").update({ is_admin: !currentStatus }).eq("id", profileId)

    await loadProfiles()
  }

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            className="flex items-center gap-3 px-4 py-3 bg-gold/10 text-gold rounded-lg transition-colors"
          >
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white/70 hover:text-white rounded-lg transition-colors"
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
            <h2 className="font-display text-xl">User Management</h2>
          </div>
          <div className="text-white/50 text-sm">{profiles.length} users</div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfiles.map((profile) => (
              <div key={profile.id} className="card-elevated p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                      <User size={24} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{profile.full_name || "No name"}</p>
                      <p className="text-white/50 text-sm">{profile.email}</p>
                    </div>
                  </div>
                  {profile.is_admin && <Crown size={18} className="text-gold" />}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Mail size={14} />
                    <span className="truncate">{profile.email}</span>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Phone size={14} />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-white/40 text-xs">
                    Joined {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => toggleAdmin(profile.id, profile.is_admin)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      profile.is_admin
                        ? "bg-gold/20 text-gold hover:bg-gold/30"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {profile.is_admin ? "Admin" : "Make Admin"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProfiles.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
