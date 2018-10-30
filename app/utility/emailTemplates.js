const emailTemplates = (deps) => {
  /**
   * Builds a HTML string which can be used as content to an email. This function uses a token to build an URL for authentication with email verification.
   *
   * @param {*} token
   * @returns
   */
  function buildVerifyEmailContent (userEmail, code) {
    const baseUrl = deps.config.app.url + deps.config.app.baseUrl
    const url = baseUrl + '/users/verify?email=' + userEmail + '&code=' + code
    const emailTemplate = '<h3>IT Portal Verification</h3><br /><p>Click on the link below to activate your account on IT Portal.</p><br /><p>' + url + '</p>'
    return emailTemplate
  }

  return {
    buildVerifyEmailContent
  }
}

module.exports = emailTemplates
