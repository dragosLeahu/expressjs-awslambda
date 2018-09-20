module.exports.formatResponse = (statusCode, data, message) => {
  return {
    statusCode: statusCode,
    message: message,
    data: data
  }
}
