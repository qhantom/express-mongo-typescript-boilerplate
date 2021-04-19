const config = {
  environment: process.env.NODE_ENV,
  server: {
    port: process.env.SERVER_PORT,
  },
  database: {
    URI: process.env.DATABASE_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
  jwt: {
    issuer: process.env.JWT_ISSUER,
    secret: process.env.JWT_SECRET,
    expirationHours: process.env.JWT_EXPIRATION_HOURS,
  },
  mail: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    from: process.env.EMAIL_FROM,
  },
}

export { config }
