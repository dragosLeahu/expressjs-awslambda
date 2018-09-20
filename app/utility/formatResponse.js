module.exports = (statusCode, data, message) => {
  return {
    statusCode: statusCode,
    message: message,
    data: data
  }
}
