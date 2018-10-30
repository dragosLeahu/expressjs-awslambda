module.exports = {
  app: {
    name: process.env.APP_NAME,
    env: process.env.NODE_ENV || 'local',
    port: process.env.PORT || 3000,
    url: process.env.APP_URL,
    baseUrl: process.env.BASE_URL
  },
  db: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
    options: {
      numberOfRetries: 5,
      auto_reconnect: true,
      poolSize: 10,
      connectTimeoutMS: 30000,
      useNewUrlParser: true
    }
  },
  auth: {
    secret: process.env.JWT_SECRET
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}
