"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import {
  Users,
  MessageSquare,
  Calendar,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Menu,
  LogOut,
  Home,
  Settings,
  BarChart3,
  User,
} from "lucide-react"

type DashboardStats = {
  totalUsers: number
  totalContacts: number
  totalBookings: number
  totalOrders: number
  revenue: number
  newUsersThisMonth: number
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalContacts: 0,
    totalBookings: 0,
    totalOrders: 0,
    revenue: 0,
    newUsersThisMonth: 0,
  })
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
      router.push("/login?redirect=/admin")
      return
    }

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    if (!profile?.is_admin) {
      router.push("/dashboard")
      return
    }

    setUser(user)
    setIsAdmin(true)
    await loadStats()
    setLoading(false)
  }

  const loadStats = async () => {
    const supabase = createClient()

    const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

    const { count: contactsCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })

    const { count: bookingsCount } = await supabase.from("bookings").select("*", { count: "exact", head: true })

    const { count: ordersCount } = await supabase.from("orders").select("*", { count: "exact", head: true })

    const { data: orders } = await supabase.from("orders").select("total")
    const revenue = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const { count: newUsers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo.toISOString())

    setStats({
      totalUsers: usersCount || 0,
      totalContacts: contactsCount || 0,
      totalBookings: bookingsCount || 0,
      totalOrders: ordersCount || 0,
      revenue,
      newUsersThisMonth: newUsers || 0,
    })
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      change: `+${stats.newUsersThisMonth} this month`,
    },
    {
      title: "Contact Submissions",
      value: stats.totalContacts,
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
      change: "View all submissions",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "from-emerald-500 to-emerald-600",
      change: "Manage bookings",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "from-orange-500 to-orange-600",
      change: "View orders",
    },
    {
      title: "Total Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-gold to-gold-bright",
      change: "+12% from last month",
    },
    {
      title: "Growth Rate",
      value: "24%",
      icon: TrendingUp,
      color: "from-rose-500 to-rose-600",
      change: "Month over month",
    },
  ]

  return (
    <div className="min-h-screen bg-void flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-card border-r border-white/10 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        {/* Logo */}
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

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 bg-gold/10 text-gold rounded-lg transition-colors"
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
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white/70 hover:text-white rounded-lg transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <User size={20} className="text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{user?.email}</p>
              <p className="text-xs text-gold">Admin</p>
            </div>
          </div>
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="w-full p-2 bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <Home size={16} />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full p-2 bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="text-white/70" size={20} />
            </button>
            <h2 className="font-display text-xl">Admin Dashboard</h2>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="card-elevated p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-white/50 text-sm mb-1">{stat.title}</p>
                      <p className="font-display text-3xl text-white">{stat.value}</p>
                    </div>
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>
                  <p className="text-white/40 text-sm">{stat.change}</p>
                </div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="card-elevated p-6 mb-8">
            <h3 className="font-display text-xl mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/admin/contacts"
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
              >
                <MessageSquare className="text-gold mb-2 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-white font-medium">View Contacts</p>
                <p className="text-white/50 text-sm">Manage submissions</p>
              </Link>
              <Link
                href="/admin/users"
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
              >
                <Users className="text-gold mb-2 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-white font-medium">Manage Users</p>
                <p className="text-white/50 text-sm">User management</p>
              </Link>
              <Link
                href="/admin/bookings"
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
              >
                <Calendar className="text-gold mb-2 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-white font-medium">Bookings</p>
                <p className="text-white/50 text-sm">Schedule management</p>
              </Link>
              <Link
                href="/admin/orders"
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
              >
                <ShoppingBag className="text-gold mb-2 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-white font-medium">Orders</p>
                <p className="text-white/50 text-sm">Order processing</p>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card-elevated p-6">
            <h3 className="font-display text-xl mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <p className="text-white/70 text-sm flex-1">New contact submission received</p>
                <p className="text-white/40 text-xs">2 min ago</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <p className="text-white/70 text-sm flex-1">New user registered</p>
                <p className="text-white/40 text-xs">15 min ago</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <p className="text-white/70 text-sm flex-1">New booking confirmed</p>
                <p className="text-white/40 text-xs">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
