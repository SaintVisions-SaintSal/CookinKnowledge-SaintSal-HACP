"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, Mail, Phone, Clock, Search } from "lucide-react"

type ContactSubmission = {
  id: string
  email: string
  full_name: string
  phone: string | null
  message: string
  metadata: any
  created_at: string
}

export default function AdminContactsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    checkAdminAndLoadContacts()
  }, [])

  const checkAdminAndLoadContacts = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login?redirect=/admin/contacts")
      return
    }

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    if (!profile?.is_admin) {
      router.push("/dashboard")
      return
    }

    const { data: submissions } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (submissions) {
      setContacts(submissions)
    }

    setLoading(false)
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-white/10 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="text-white/70" size={20} />
              </Link>
              <div>
                <h1 className="font-display text-2xl">Contact Submissions</h1>
                <p className="text-white/50 text-sm">{contacts.length} total submissions</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-dark pl-12 w-full max-w-md"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="card-elevated p-6 hover:border-gold/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-display text-lg text-white mb-2">{contact.full_name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-white/50">
                      <Mail size={16} />
                      {contact.email}
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-white/50">
                        <Phone size={16} />
                        {contact.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-white/50">
                      <Clock size={16} />
                      {new Date(contact.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {contact.message && (
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-white/70 text-sm leading-relaxed">{contact.message}</p>
                </div>
              )}
            </div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/50">No contact submissions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
