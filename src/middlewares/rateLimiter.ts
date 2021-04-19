import rateLimiter, { RateLimit } from 'express-rate-limit'

const generalRateLimiter: RateLimit = rateLimiter({
  windowMs: 1000 * 60 * 15, // 15 min
  max: 100,
})

export { generalRateLimiter }
