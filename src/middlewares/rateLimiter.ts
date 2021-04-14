import rateLimiter from 'express-rate-limit'

const authLimiter = rateLimiter({
  windowMs: 1000 * 60 * 15, // 15 min
  max: 20,
  skipSuccessfulRequests: true,
})

export { authLimiter }
