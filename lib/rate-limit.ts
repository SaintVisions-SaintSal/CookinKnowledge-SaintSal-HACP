// Simple in-memory rate limiter for production
// For enterprise scale, use Redis with Upstash

type RateLimitStore = Map<string, { count: number; resetTime: number }>

const store: RateLimitStore = new Map()

export interface RateLimitConfig {
  interval: number // milliseconds
  maxRequests: number
}

export function rateLimit(config: RateLimitConfig) {
  return {
    check: (identifier: string): { success: boolean; remaining: number; reset: number } => {
      const now = Date.now()
      const record = store.get(identifier)

      // Clean up expired entries
      if (record && now > record.resetTime) {
        store.delete(identifier)
      }

      const current = store.get(identifier)

      if (!current) {
        // First request
        const resetTime = now + config.interval
        store.set(identifier, { count: 1, resetTime })
        return { success: true, remaining: config.maxRequests - 1, reset: resetTime }
      }

      if (current.count >= config.maxRequests) {
        // Rate limit exceeded
        return { success: false, remaining: 0, reset: current.resetTime }
      }

      // Increment count
      current.count++
      return { success: true, remaining: config.maxRequests - current.count, reset: current.resetTime }
    },
  }
}

// Predefined rate limiters
export const aiChatLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  maxRequests: 20, // 20 requests per minute
})

export const formLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 submissions per minute
})
