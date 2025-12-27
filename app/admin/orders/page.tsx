"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import {
  ShoppingBag,
  Search,
  Loader2,
  Menu,
  LogOut,
  Calendar,
  MessageSquare,
  Users,
  BarChart3,
  Truck,
  Check,
} from "lucide-react"

type Order = {
  id: string
  shipping_name: string
  shipping_email: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_zip: string
  total_amount: number
  status: string
  created_at: string
  order_items: {
    quantity: number
    price: number
    products: {
      name: string
    }
  }[]
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
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
      router.push("/login?redirect=/admin/orders")
      return
    }

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    if (!profile?.is_admin) {
      router.push("/dashboard")
      return
    }

    setUser(user)
    await loadOrders()
    setLoading(false)
  }

  const loadOrders = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("orders")
      .select(`*, order_items (quantity, price, products (name))`)
      .order("created_at", { ascending: false })

    if (data) {
      setOrders(data)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    const supabase = createClient()
    await supabase.from("orders").update({ status }).eq("id", orderId)

    await loadOrders()
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.shipping_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shipping_email?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
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
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white/70 hover:text-white rounded-lg transition-colors"
          >
            <Calendar size={20} />
            <span>Bookings</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 bg-gold/10 text-gold rounded-lg transition-colors"
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
            <h2 className="font-display text-xl">Order Management</h2>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search orders..."
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
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Orders */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="card-elevated p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-white font-medium">{order.shipping_name}</p>
                    <p className="text-white/50 text-sm">{order.shipping_email}</p>
                    <p className="text-white/40 text-xs mt-1">
                      {order.shipping_address}, {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "delivered"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : order.status === "shipped"
                            ? "bg-blue-500/20 text-blue-400"
                            : order.status === "processing"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : order.status === "cancelled"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-white/10 text-white/70"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-gold font-bold text-lg">${order.total_amount?.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {order.order_items?.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-white/70">
                        {item.products?.name} x{item.quantity}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-sm">{new Date(order.created_at).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateOrderStatus(order.id, "processing")}
                        className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400 text-xs transition-colors"
                      >
                        Processing
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "shipped")}
                        className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 text-xs transition-colors flex items-center gap-1"
                      >
                        <Truck size={12} />
                        Ship
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                        className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-emerald-400 text-xs transition-colors flex items-center gap-1"
                      >
                        <Check size={12} />
                        Delivered
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
