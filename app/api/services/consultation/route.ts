import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

async function sendEmailWithResend(
  to: string[],
  subject: string,
  html: string,
  from = "Saint Vision Technologies <hello@cookinbiz.com>",
) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn("[v0] RESEND_API_KEY not configured, skipping email")
      return { success: false, error: "Email not configured" }
    }

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from,
      to,
      subject,
      html,
    })

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Email send error:", error)
    return { success: false, error: error.message }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      company,
      serviceTier,
      serviceInterest,
      budgetRange,
      timeline,
      projectDescription,
      currentTechStack,
      goals,
      preferredDate,
      preferredTime,
      timezone,
    } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Save to database
    const { data: consultation, error: dbError } = await supabase
      .from("service_consultations")
      .insert({
        name,
        email,
        phone,
        company,
        service_tier: serviceTier,
        service_interest: serviceInterest || [],
        budget_range: budgetRange,
        timeline,
        project_description: projectDescription,
        current_tech_stack: currentTechStack,
        goals,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        timezone: timezone || "America/Los_Angeles",
        status: "pending",
      })
      .select()
      .single()

    if (dbError) {
      console.error("[v0] Database error:", dbError)
      return NextResponse.json({ error: "Failed to save consultation" }, { status: 500 })
    }

    // Get tier display name and pricing
    const tierInfo: Record<string, { name: string; price: string }> = {
      starter: { name: "Tier 1 - Starter", price: "$5K - $15K" },
      professional: { name: "Tier 2 - Professional", price: "$15K - $50K" },
      enterprise: { name: "Tier 3 - Enterprise", price: "$50K+" },
      licensing: { name: "Tier 4 - Licensing", price: "Custom Monthly" },
    }

    const tier = tierInfo[serviceTier] || { name: "Not specified", price: "TBD" }

    await sendEmailWithResend(
      ["ryan@cookin.io"],
      `NEW SERVICE INQUIRY: ${tier.name} - ${name} from ${company || "Individual"}`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px;">New Service Consultation Request</h1>
            <p style="color: #888; margin-top: 10px;">${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST</p>
          </div>

          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border: 1px solid #d4af37; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h2 style="color: #d4af37; margin: 0 0 16px 0; font-size: 20px;">Service Tier: ${tier.name}</h2>
            <p style="color: #d4af37; font-size: 24px; font-weight: bold; margin: 0;">${tier.price}</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h3 style="color: #d4af37; margin: 0 0 16px 0;">Contact Information</h3>
            <table style="width: 100%; color: #ffffff;">
              <tr><td style="padding: 8px 0; color: #888;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #d4af37;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #d4af37;">${phone}</a></td></tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #888;">Company:</td><td style="padding: 8px 0;">${company}</td></tr>` : ""}
            </table>
          </div>

          ${
            budgetRange || timeline
              ? `
          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h3 style="color: #d4af37; margin: 0 0 16px 0;">Budget & Timeline</h3>
            <table style="width: 100%; color: #ffffff;">
              ${budgetRange ? `<tr><td style="padding: 8px 0; color: #888;">Budget Range:</td><td style="padding: 8px 0;">${budgetRange}</td></tr>` : ""}
              ${timeline ? `<tr><td style="padding: 8px 0; color: #888;">Timeline:</td><td style="padding: 8px 0;">${timeline}</td></tr>` : ""}
            </table>
          </div>
          `
              : ""
          }

          ${
            serviceInterest && serviceInterest.length > 0
              ? `
          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h3 style="color: #d4af37; margin: 0 0 16px 0;">Services Interested In</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${serviceInterest.map((s: string) => `<span style="background: #d4af37; color: #0a0a0a; padding: 6px 12px; border-radius: 20px; font-size: 14px;">${s}</span>`).join("")}
            </div>
          </div>
          `
              : ""
          }

          ${
            projectDescription
              ? `
          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h3 style="color: #d4af37; margin: 0 0 16px 0;">Project Description</h3>
            <p style="color: #ffffff; margin: 0; line-height: 1.6;">${projectDescription}</p>
          </div>
          `
              : ""
          }

          ${
            goals
              ? `
          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h3 style="color: #d4af37; margin: 0 0 16px 0;">Goals</h3>
            <p style="color: #ffffff; margin: 0; line-height: 1.6;">${goals}</p>
          </div>
          `
              : ""
          }

          ${
            currentTechStack
              ? `
          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h3 style="color: #d4af37; margin: 0 0 16px 0;">Current Tech Stack</h3>
            <p style="color: #ffffff; margin: 0; line-height: 1.6;">${currentTechStack}</p>
          </div>
          `
              : ""
          }

          ${
            preferredDate || preferredTime
              ? `
          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h3 style="color: #d4af37; margin: 0 0 16px 0;">Preferred Schedule</h3>
            <table style="width: 100%; color: #ffffff;">
              ${preferredDate ? `<tr><td style="padding: 8px 0; color: #888;">Date:</td><td style="padding: 8px 0;">${preferredDate}</td></tr>` : ""}
              ${preferredTime ? `<tr><td style="padding: 8px 0; color: #888;">Time:</td><td style="padding: 8px 0;">${preferredTime}</td></tr>` : ""}
            </table>
          </div>
          `
              : ""
          }

          <div style="text-align: center; margin-top: 30px;">
            <a href="tel:${phone}" style="display: inline-block; background: #d4af37; color: #0a0a0a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-right: 10px;">Call Now</a>
            <a href="mailto:${email}" style="display: inline-block; background: transparent; color: #d4af37; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; border: 2px solid #d4af37;">Send Email</a>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #888; font-size: 12px; margin: 0;">Saint Vision Technologies LLC</p>
            <p style="color: #888; font-size: 12px; margin: 4px 0;">US Patent #10,290,222 | HACP Framework</p>
          </div>
        </div>
      `,
      "SaintSal Services <services@cookinbiz.com>",
    )

    await sendEmailWithResend(
      [email],
      "Thank You for Your Interest in Saint Vision Technologies",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
            <p style="color: #888; margin-top: 10px;">We received your consultation request</p>
          </div>

          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <p style="color: #ffffff; line-height: 1.8; margin: 0;">
              Thank you for your interest in <strong style="color: #d4af37;">Saint Vision Technologies</strong> and our ${tier.name} services.
            </p>
            <p style="color: #ffffff; line-height: 1.8; margin: 16px 0 0 0;">
              Our founder, <strong>Ryan</strong>, will personally review your inquiry and reach out within <strong style="color: #d4af37;">24 hours</strong> to discuss how we can help bring your vision to life.
            </p>
          </div>

          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border: 1px solid #d4af37; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h3 style="color: #d4af37; margin: 0 0 16px 0;">What's Next?</h3>
            <ul style="color: #ffffff; margin: 0; padding-left: 20px; line-height: 2;">
              <li>Review of your project requirements</li>
              <li>Discovery call to understand your goals</li>
              <li>Custom proposal tailored to your needs</li>
              <li>IP protection strategy discussion</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #888; margin-bottom: 16px;">Need immediate assistance?</p>
            <a href="tel:+19496301858" style="display: inline-block; background: #d4af37; color: #0a0a0a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">Call (949) 630-1858</a>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #d4af37; font-size: 14px; font-style: italic; margin: 0 0 16px 0;">"For I know the plans I have for you, declares the Lord"</p>
            <p style="color: #888; font-size: 12px; margin: 0;">Saint Vision Technologies LLC</p>
            <p style="color: #888; font-size: 12px; margin: 4px 0;">US Patent #10,290,222 | HACP Framework</p>
          </div>
        </div>
      `,
      "Saint Vision Technologies <hello@cookinbiz.com>",
    )

    // Log activity
    await supabase.from("activity_logs").insert({
      action: "consultation_request",
      entity_type: "service_consultation",
      entity_id: consultation.id,
      metadata: { tier: serviceTier, email },
    })

    return NextResponse.json({
      success: true,
      message: "Consultation request submitted successfully",
      id: consultation.id,
    })
  } catch (error) {
    console.error("[v0] Consultation API error:", error)
    return NextResponse.json({ error: "Failed to process consultation request" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const tier = searchParams.get("tier")

    const supabase = await createClient()

    let query = supabase.from("service_consultations").select("*").order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    if (tier) {
      query = query.eq("service_tier", tier)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ consultations: data })
  } catch (error) {
    console.error("GET consultations error:", error)
    return NextResponse.json({ error: "Failed to fetch consultations" }, { status: 500 })
  }
}
