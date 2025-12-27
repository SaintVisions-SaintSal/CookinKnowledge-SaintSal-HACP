// Client-side analytics helper for tracking user events

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  try {
    // Apollo tracking
    if (typeof window !== "undefined" && (window as any).trackingFunctions?.track) {
      ;(window as any).trackingFunctions.track(eventName, properties)
    }

    // Console log in development (localhost or vercel preview)
    if (
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" || window.location.hostname.includes("vercel.app"))
    ) {
      console.log("[v0] Analytics Event:", eventName, properties)
    }
  } catch (error) {
    console.error("[v0] Analytics error:", error)
  }
}

export function trackPageView(url: string) {
  trackEvent("page_view", { url })
}

export function trackSignup(method: string) {
  trackEvent("signup", { method })
}

export function trackLogin(method: string) {
  trackEvent("login", { method })
}

export function trackBooking(programName: string) {
  trackEvent("booking_created", { program: programName })
}

export function trackFormSubmission(formType: string) {
  trackEvent("form_submission", { form_type: formType })
}

export function trackAIChat(model: string) {
  trackEvent("ai_chat_message", { model })
}
