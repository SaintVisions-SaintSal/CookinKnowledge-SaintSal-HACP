"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Calendar, Clock, ArrowRight, ArrowLeft, Check, Loader2, Home, Sparkles } from "lucide-react"

type Program = {
  id: string
  name: string
  description: string
  price: number
  duration_minutes: number
  category: string
  features: string[]
  image_url: string
  is_active: boolean
}

export default function BookingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [programs, setPrograms] = useState<Program[]>([])
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    athleteName: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    notes: "",
  })

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  useEffect(() => {
    checkAuth()
    loadPrograms()
  }, [])

  const checkAuth = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      setFormData((prev) => ({ ...prev, parentEmail: user.email || "" }))
    }
  }

  const loadPrograms = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("programs")
      .select("*")
      .eq("is_active", true)
      .order("price", { ascending: true })

    if (data) {
      setPrograms(data)
    }
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (!selectedProgram || !selectedDate || !selectedTime) return

    setSubmitting(true)
    const supabase = createClient()

    const { error } = await supabase.from("bookings").insert({
      program_id: selectedProgram.id,
      user_id: user?.id,
      booking_date: selectedDate.toISOString(),
      duration_minutes: selectedProgram.duration_minutes,
      athlete_name: formData.athleteName,
      parent_name: formData.parentName,
      parent_email: formData.parentEmail,
      parent_phone: formData.parentPhone,
      notes: formData.notes,
      status: "pending",
    })

    if (!error) {
      setSuccess(true)
    }
    setSubmitting(false)
  }

  const generateCalendarDays = () => {
    const today = new Date()
    const days = []
    for (let i = 0; i < 28; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0) {
        days.push(date)
      }
    }
    return days
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-white" />
          </div>
          <h1 className="font-display text-3xl text-white mb-4">Booking Confirmed!</h1>
          <p className="text-white/60 mb-8">
            Your session has been booked. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <Link href="/dashboard" className="btn-gold w-full flex items-center justify-center gap-2">
              <Sparkles size={18} />
              Go to Dashboard
            </Link>
            <Link href="/" className="btn-ghost w-full flex items-center justify-center gap-2">
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-white/10 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/DripLogoSaintSal_.png" alt="CookinBiz" width={40} height={40} className="rounded-lg" />
            <span className="font-display text-xl">
              <span className="text-white">Cookin</span>
              <span className="text-gold">Biz</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="btn-ghost text-sm">
              Dashboard
            </Link>
            {!user && (
              <Link href="/login?redirect=/bookings" className="btn-gold text-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s ? "bg-gradient-to-br from-gold to-gold-bright text-void" : "bg-white/10 text-white/40"
                }`}
              >
                {step > s ? <Check size={18} /> : s}
              </div>
              {s < 4 && <div className={`w-16 h-0.5 ${step > s ? "bg-gold" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Program */}
        {step === 1 && (
          <div>
            <h1 className="font-display text-4xl text-white text-center mb-4">Choose Your Program</h1>
            <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">
              Select the training program that fits your goals
            </p>

            {programs.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={48} className="text-white/20 mx-auto mb-4" />
                <p className="text-white/40">No programs available at this time</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    onClick={() => setSelectedProgram(program)}
                    className={`card-elevated p-6 cursor-pointer transition-all ${
                      selectedProgram?.id === program.id ? "border-gold ring-2 ring-gold/30" : "hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{program.name}</h3>
                        <span className="text-xs px-2 py-1 bg-gold/20 text-gold rounded-full">{program.category}</span>
                      </div>
                      {selectedProgram?.id === program.id && (
                        <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                          <Check size={14} className="text-void" />
                        </div>
                      )}
                    </div>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{program.description}</p>
                    <div className="flex items-center gap-4 text-white/50 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {program.duration_minutes} min
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-2xl font-bold text-gold">${program.price}</span>
                      <span className="text-white/40 text-sm">per session</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedProgram}
                className="btn-gold flex items-center gap-2 disabled:opacity-50"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div>
            <h1 className="font-display text-4xl text-white text-center mb-4">Select Date & Time</h1>
            <p className="text-white/60 text-center mb-12">
              Choose when you would like to schedule your {selectedProgram?.name} session
            </p>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Calendar */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-center text-white/40 text-xs py-2">
                      {day}
                    </div>
                  ))}
                  {generateCalendarDays().map((date, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? "bg-gold text-void font-semibold"
                          : "bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select Time</h3>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        selectedTime === time
                          ? "bg-gold text-void font-semibold"
                          : "bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button onClick={() => setStep(1)} className="btn-ghost flex items-center gap-2">
                <ArrowLeft size={18} />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="btn-gold flex items-center gap-2 disabled:opacity-50"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div>
            <h1 className="font-display text-4xl text-white text-center mb-4">Your Details</h1>
            <p className="text-white/60 text-center mb-12">Please provide your contact information</p>

            <div className="max-w-xl mx-auto">
              <div className="card-elevated p-6 space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Athlete Name *</label>
                  <input
                    type="text"
                    value={formData.athleteName}
                    onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Parent/Guardian Name *</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"
                    rows={3}
                    placeholder="Any special requests or information"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button onClick={() => setStep(2)} className="btn-ghost flex items-center gap-2">
                <ArrowLeft size={18} />
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={
                  !formData.athleteName || !formData.parentName || !formData.parentEmail || !formData.parentPhone
                }
                className="btn-gold flex items-center gap-2 disabled:opacity-50"
              >
                Review Booking
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div>
            <h1 className="font-display text-4xl text-white text-center mb-4">Confirm Booking</h1>
            <p className="text-white/60 text-center mb-12">Review your booking details before confirming</p>

            <div className="max-w-xl mx-auto">
              <div className="card-elevated p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Program</h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white font-medium">{selectedProgram?.name}</p>
                    <p className="text-white/60 text-sm">{selectedProgram?.duration_minutes} minutes</p>
                    <p className="text-gold font-bold mt-2">${selectedProgram?.price}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Date & Time</h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white">
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-gold">{selectedTime}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Contact Details</h3>
                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <p className="text-white">
                      <span className="text-white/50">Athlete:</span> {formData.athleteName}
                    </p>
                    <p className="text-white">
                      <span className="text-white/50">Parent:</span> {formData.parentName}
                    </p>
                    <p className="text-white">
                      <span className="text-white/50">Email:</span> {formData.parentEmail}
                    </p>
                    <p className="text-white">
                      <span className="text-white/50">Phone:</span> {formData.parentPhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button onClick={() => setStep(3)} className="btn-ghost flex items-center gap-2">
                <ArrowLeft size={18} />
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-gold flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <Check size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
