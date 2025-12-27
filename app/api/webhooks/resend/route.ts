import { headers } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headersList = await headers()

    const svixId = headersList.get("svix-id")
    const svixTimestamp = headersList.get("svix-timestamp")
    const svixSignature = headersList.get("svix-signature")

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("[v0] Missing svix headers")
      return NextResponse.json({ error: "Missing headers" }, { status: 400 })
    }

    const signingSecret = process.env.RESEND_SIGNING_SECRET

    if (!signingSecret) {
      console.error("[v0] Missing RESEND_SIGNING_SECRET")
      return NextResponse.json({ error: "Configuration error" }, { status: 500 })
    }

    // Create the signed content (timestamp.payload)
    const signedContent = `${svixId}.${svixTimestamp}.${body}`

    // Extract the secret from the whsec_ prefixed format
    const secret = signingSecret.startsWith("whsec_")
      ? Buffer.from(signingSecret.slice(6), "base64")
      : Buffer.from(signingSecret)

    // Compute the expected signature
    const expectedSignature = crypto.createHmac("sha256", secret).update(signedContent).digest("base64")

    // Extract the signature from the header (format: v1,signature)
    const signatures = svixSignature.split(" ")
    const isValid = signatures.some((sig) => {
      const [, signature] = sig.split(",")
      return signature === expectedSignature
    })

    if (!isValid) {
      console.error("[v0] Invalid webhook signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    console.log("[v0] Webhook signature verified successfully")

    const payload = JSON.parse(body)
    const supabase = await createClient()
    const { type, data } = payload

    console.log("[v0] Resend webhook received:", type)

    const { error: logError } = await supabase.from("email_events").insert({
      event_type: type,
      email_id: data.email_id || data.id,
      email: data.to || data.email,
      subject: data.subject,
      from_email: data.from,
      to_email: data.to,
      timestamp: data.created_at || new Date().toISOString(),
      raw_data: data,
    })

    if (logError) {
      console.error("[v0] Failed to log email event:", logError)
    }

    // Handle specific event types
    switch (type) {
      case "email.sent":
        console.log("[v0] Email sent successfully:", data.email_id)
        break

      case "email.delivered":
        console.log("[v0] Email delivered:", data.email_id)
        break

      case "email.delivery_delayed":
        console.log("[v0] Email delivery delayed:", data.email_id)
        break

      case "email.bounced":
        console.error("[v0] Email bounced:", data.email_id, data.bounce_type)
        break

      case "email.complained":
        console.error("[v0] Spam complaint:", data.email_id)
        break

      case "email.opened":
        console.log("[v0] Email opened:", data.email_id)
        break

      case "email.clicked":
        console.log("[v0] Email link clicked:", data.email_id, data.link)
        break

      default:
        console.log("[v0] Unknown email event type:", type)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Resend webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
