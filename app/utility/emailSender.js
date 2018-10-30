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

  function verifyConnectionConfiguration () {
    transporter.verify(function (error, success) {
      if (error) {
        throw new Error(error.message)
      } else {
        console.log('Email server is ready to send messages')
      }
    })
  }

  async function sendEmail (toAddress, subject, content) {
    const mailOptions = {
      from: 'IT Portal <' + emailConfig.auth.user + '>',
      to: toAddress,
      subject: subject,
      html: content
    }

    const sent = await transporter.sendMail(mailOptions)
    return sent
  }

  return {
    sendEmail,
    verifyConnectionConfiguration
  }
}

module.exports = emailSender
