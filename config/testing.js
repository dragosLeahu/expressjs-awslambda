module.exports = {
  app: {
    name: process.env.APP_NAME,
    env: process.env.NODE_ENV || 'testing',
    port: process.env.PORT || 3000
  },
  db: {
    name: 'testing',
    url: process.env.DB_URL,
    options: {
      numberOfRetries: 5,
      auto_reconnect: true,
      poolSize: 10,
      connectTimeoutMS: 30000,
      useNewUrlParser: true
    }
  }
}
