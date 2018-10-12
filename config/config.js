module.exports = {
  app: {
    name: process.env.APP_NAME,
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000
  },
  mongo: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL
  }
}
