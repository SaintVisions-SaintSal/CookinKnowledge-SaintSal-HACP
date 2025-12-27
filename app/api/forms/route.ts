import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { formLimiter } from "@/lib/rate-limit"

// Form types
type FormType = "contact" | "consultation" | "service" | "funding"

async function sendEmail(to: string | string[], subject: string, html: string, replyTo?: string) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn("[v0] RESEND_API_KEY not configured, skipping email")
      return { success: false, error: "Email not configured" }
    }

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: "CookinBiz Notifications <notifications@cookinbiz.com>",
      to: Array.isArray(to) ? to : [to],
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
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const rateLimitResult = formLimiter.check(ip)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many submissions. Please try again later.",
          reset: new Date(rateLimitResult.reset).toISOString(),
        },
        { status: 429 },
      )
    }

    const body = await req.json()
    const { formType = "contact", data } = body as {
      formType?: FormType
      data: Record<string, any>
    }

    // Validate required fields
    if (!data || !data.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!data.phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: submission, error: submissionError } = await supabase
      .from("contact_submissions")
      .insert({
        email: data.email,
        full_name: data.name || `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        phone: data.phone,
        message: data.message || "",
        metadata: {
          formType,
          ...data,
        },
      })
      .select()
      .single()

    if (submissionError) {
      console.error("[v0] Supabase error:", submissionError)
      return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
    }

    // Determine email subject and recipient based on form type
    const emailConfig = getEmailConfig(formType, data)

    // Send admin notification
    await sendEmail("support@cookin.io", emailConfig.subject, emailConfig.html, data.email)

    // Send confirmation email to user
    if (data.email) {
      await sendEmail(data.email, "Thank you for your inquiry - CookinBiz", getConfirmationEmail(formType, data))
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      message: "Form submitted successfully. Check your email and phone for confirmation.",
    })
  } catch (error: any) {
    console.error("[v0] Form submission error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

function getEmailConfig(formType: FormType, data: Record<string, any>) {
  const name = data.name || `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Unknown"
  const email = data.email || "No email provided"
  const phone = data.phone || "No phone provided"

  const configs: Record<FormType, { subject: string; html: string }> = {
    contact: {
      subject: `New Contact Inquiry - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #141414; color: #fff; padding: 40px; border-radius: 12px;">
          <h2 style="color: #D4AF37; margin-bottom: 20px;">New Contact Inquiry</h2>
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Email:</strong> <a href="mailto:${email}" style="color: #D4AF37;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Phone:</strong> <a href="tel:${phone}" style="color: #D4AF37;">${phone}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Interest:</strong> ${data.interest || "N/A"}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Message:</strong></p>
            <p style="background: #0a0a0a; padding: 15px; border-radius: 6px; margin: 10px 0;">${data.message || "N/A"}</p>
          </div>
          <a href="https://cookinbiz.com/admin/contacts" style="display: inline-block; background: linear-gradient(135deg, #D4AF37, #FFD700); color: #0a0a0a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View in Admin Dashboard</a>
        </div>
      `,
    },
    service: {
      subject: `New Service Inquiry - ${name} (${data.serviceType || "Unknown Service"})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #141414; color: #fff; padding: 40px; border-radius: 12px;">
          <h2 style="color: #D4AF37; margin-bottom: 20px;">New Service Inquiry</h2>
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Email:</strong> <a href="mailto:${email}" style="color: #D4AF37;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Phone:</strong> <a href="tel:${phone}" style="color: #D4AF37;">${phone}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Company:</strong> ${data.company || "N/A"}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Service Type:</strong> ${data.serviceType || "N/A"}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Details:</strong></p>
            <p style="background: #0a0a0a; padding: 15px; border-radius: 6px; margin: 10px 0;">${data.message || "N/A"}</p>
          </div>
          <a href="https://cookinbiz.com/admin/contacts" style="display: inline-block; background: linear-gradient(135deg, #D4AF37, #FFD700); color: #0a0a0a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View in Admin Dashboard</a>
        </div>
      `,
    },
    funding: {
      subject: `New Funding Inquiry - ${name} (${data.loanAmount || "Amount TBD"})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #141414; color: #fff; padding: 40px; border-radius: 12px;">
          <h2 style="color: #D4AF37; margin-bottom: 20px;">New Funding Inquiry</h2>
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Email:</strong> <a href="mailto:${email}" style="color: #D4AF37;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Phone:</strong> <a href="tel:${phone}" style="color: #D4AF37;">${phone}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Business/Company:</strong> ${data.company || "N/A"}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Loan Amount:</strong> ${data.loanAmount || "N/A"}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Property Type:</strong> ${data.propertyType || "N/A"}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Timeline:</strong> ${data.timeline || "N/A"}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Details:</strong></p>
            <p style="background: #0a0a0a; padding: 15px; border-radius: 6px; margin: 10px 0;">${data.message || "N/A"}</p>
          </div>
          <a href="https://cookinbiz.com/admin/contacts" style="display: inline-block; background: linear-gradient(135deg, #D4AF37, #FFD700); color: #0a0a0a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View in Admin Dashboard</a>
        </div>
      `,
    },
    consultation: {
      subject: `New Consultation Request - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #141414; color: #fff; padding: 40px; border-radius: 12px;">
          <h2 style="color: #D4AF37; margin-bottom: 20px;">New Consultation Request</h2>
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Email:</strong> <a href="mailto:${email}" style="color: #D4AF37;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Phone:</strong> <a href="tel:${phone}" style="color: #D4AF37;">${phone}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Consultation Type:</strong> ${data.consultationType || "N/A"}</p>
            <p style="margin: 10px 0;"><strong style="color: #D4AF37;">Message:</strong></p>
            <p style="background: #0a0a0a; padding: 15px; border-radius: 6px; margin: 10px 0;">${data.message || "N/A"}</p>
          </div>
          <a href="https://cookinbiz.com/admin/contacts" style="display: inline-block; background: linear-gradient(135deg, #D4AF37, #FFD700); color: #0a0a0a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View in Admin Dashboard</a>
        </div>
      `,
    },
  }

  return configs[formType] || configs.contact
}

function getConfirmationEmail(formType: FormType, data: Record<string, any>) {
  const name = data.firstName || data.name?.split(" ")[0] || "there"

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #0a0a0a; color: #fff; padding: 40px; margin: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #141414; border-radius: 12px; padding: 40px; border: 1px solid #333; }
        .logo { text-align: center; margin-bottom: 30px; }
        .gold { color: #D4AF37; }
        h1 { color: #D4AF37; font-size: 28px; margin: 0 0 20px 0; }
        p { color: #ccc; line-height: 1.6; margin: 15px 0; }
        .highlight { background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 3px solid #D4AF37; }
        .btn { display: inline-block; background: linear-gradient(135deg, #D4AF37, #FFD700); color: #0a0a0a; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; }
        .contact-box { background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center; }
        .phone-number { color: #D4AF37; font-size: 24px; font-weight: bold; margin: 10px 0; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <h1>Cookin<span class="gold">Biz</span></h1>
          <p style="color: #D4AF37; font-size: 14px; margin: 0;">Responsible Intelligence - Cookin' Knowledge 24/7</p>
        </div>
        
        <h1>Thank you, ${name}!</h1>
        
        <p>We've received your ${formType} inquiry and our team at CookinBiz will review it within 24 hours.</p>
        
        <div class="highlight">
          <p style="margin: 0;"><strong style="color: #D4AF37;">What happens next?</strong></p>
          <ul style="color: #ccc; margin: 10px 0; padding-left: 20px;">
            <li>We'll review your inquiry within 24 hours</li>
            <li>A team member will reach out via email or phone</li>
            <li>We'll schedule a consultation if needed</li>
          </ul>
        </div>
        
        <p>In the meantime, explore our AI platform:</p>
        <a href="https://saintsal.ai" class="btn">Launch SaintSal.ai</a>
        
        <div class="contact-box">
          <p style="color: #D4AF37; font-weight: bold; margin: 0 0 10px 0;">Need immediate assistance?</p>
          <p style="margin: 5px 0;">Call us directly:</p>
          <div class="phone-number">(949) 416-9971</div>
          <p style="margin: 15px 0 5px 0; color: #999; font-size: 14px;">or email</p>
          <a href="mailto:support@cookin.io" style="color: #D4AF37; text-decoration: none;">support@cookin.io</a>
        </div>
        
        <div class="footer">
          <p>2025 Saint Vision Technologies LLC</p>
          <p>HACP | SaintSal | Patent #10,290,222</p>
          <p style="margin-top: 15px;">
            <a href="https://cookinbiz.com" style="color: #666; text-decoration: none;">cookinbiz.com</a> | 
            <a href="https://saintsal.ai" style="color: #666; text-decoration: none;">saintsal.ai</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}
