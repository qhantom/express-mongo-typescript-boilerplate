import rateLimiter, { RateLimitRequestHandler } from 'express-rate-limit'

const generalRateLimiter: RateLimitRequestHandler = rateLimiter({
  windowMs: 1000 * 60 * 15, // 15 min
  max: 100,
})

export { generalRateLimiter }
