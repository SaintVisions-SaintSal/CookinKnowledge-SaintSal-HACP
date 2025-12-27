import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function sendEmail(to: string[], subject: string, html: string, replyTo?: string) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn("[v0] RESEND_API_KEY not configured, skipping email")
      return { success: false, error: "Email not configured" }
    }

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: "SaintSal Applications <applications@cookinbiz.com>",
      to,
      subject,
      html,
      replyTo,
    })

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Email send error:", error)
    return { success: false, error: error.message }
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { formType, ...formData } = data

    // Initialize Supabase
    const supabase = await createClient()

    // Store in database
    const { error: dbError } = await supabase.from("applications").insert({
      form_type: formType,
      data: formData,
      status: "new",
      created_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error("[v0] Database error:", dbError)
    }

    // Prepare email content based on form type
    const formTypeLabels: Record<string, string> = {
      lending: "Commercial Lending Application",
      investment: "Investment Account Application",
      merchant: "Merchant Services Request",
      credit: "Credit Services Request",
      tech: "Technology Development Intake",
    }

    const subject = `New ${formTypeLabels[formType] || "Application"} Submission`

    // Build HTML email with form data
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; padding: 20px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0;">SaintSal.ai</h1>
          <p style="color: #888; margin: 5px 0 0 0;">New Application Submission</p>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            ${formTypeLabels[formType] || "Application"}
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${Object.entries(formData)
              .map(
                ([key, value]) => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #555; width: 40%;">
                  ${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">
                  ${value || "N/A"}
                </td>
              </tr>
            `,
              )
              .join("")}
          </table>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
        <div style="background: #1a1a1a; padding: 15px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">
            Saint Vision Technologies LLC - Cookin Knowledge 24/7
          </p>
        </div>
      </div>
    `

    // Send email notification (non-blocking)
    await sendEmail(["support@cookin.io", "ryan@cookinknowledge.com"], subject, htmlContent)

    // Send confirmation to applicant if email provided
    if (formData.email) {
      const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 20px; text-align: center;">
            <h1 style="color: #d4af37; margin: 0;">SaintSal.ai</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333;">Thank You for Your Application!</h2>
            <p style="color: #555; line-height: 1.6;">
              We have received your ${formTypeLabels[formType]?.toLowerCase() || "application"} and our team will review it within 24-48 hours.
            </p>
            <p style="color: #555; line-height: 1.6;">
              A member of our team will reach out to you at ${formData.email} or ${formData.phone || "your provided phone number"} to discuss next steps.
            </p>
            <div style="margin-top: 30px; padding: 20px; background: #fff; border-left: 4px solid #d4af37;">
              <p style="margin: 0; color: #333; font-weight: bold;">Have questions?</p>
              <p style="margin: 5px 0 0 0; color: #555;">
                Chat with SaintSal AI at <a href="https://saintsal.ai/dashboard" style="color: #d4af37;">saintsal.ai/dashboard</a>
                or email us at <a href="mailto:support@cookin.io" style="color: #d4af37;">support@cookin.io</a>
              </p>
            </div>
          </div>
          <div style="background: #1a1a1a; padding: 15px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 12px;">
              Saint Vision Technologies LLC - Cookin Knowledge 24/7
            </p>
          </div>
        </div>
      `

      await sendEmail(
        [formData.email],
        `Application Received - ${formTypeLabels[formType] || "SaintSal"}`,
        confirmationHtml,
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Application submission error:", error)
    return NextResponse.json({ error: error.message || "Submission failed" }, { status: 500 })
  }
}
