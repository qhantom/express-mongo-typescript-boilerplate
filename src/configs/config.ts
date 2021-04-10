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
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}

export { config }
