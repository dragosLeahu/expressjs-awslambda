const emailSender = (deps) => {
  const emailConfig = {
    pool: true,
    host: deps.config.email.host,
    port: deps.config.email.port,
    secure: true,
    auth: {
      user: deps.config.email.user,
      pass: deps.config.email.pass
    }
  }

  const transporter = deps.nodemailer.createTransport(emailConfig)

  async function sendEmail (toAddress, subject, content) {
    const mailOptions = {
      from: 'IT Portal <' + emailConfig.auth.user + '>',
      to: toAddress,
      subject: subject,
      html: content
    }

    const info = transporter.sendMail(mailOptions)
    return info
  }

  return {
    sendEmail
  }
}

module.exports = emailSender
