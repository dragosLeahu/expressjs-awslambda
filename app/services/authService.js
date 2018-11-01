const authService = (deps, repository, emailSender, emailTemplates) => {
  const collectionName = deps.constants.dbCollections.USERS

  async function registerUser (userEmail, userPassword, passwordConfirm, userRoles = []) {
    if (userEmail && userPassword && passwordConfirm) {
      if (userPassword === passwordConfirm) {
        const criteria = {
          email: userEmail
        }
        const userExists = await repository.findOne(collectionName, criteria)

        if (!userExists) {
          const saltRounds = 10
          const hash = await deps.bcrypt.hash(userPassword, saltRounds)
          const codeExpirationDate = deps.moment().add(1, 'd').toDate()
          const verificationCode = deps.cryptoRandomString(25)
          const userData = {
            email: userEmail,
            password: hash,
            roles: userRoles,
            verification: {
              verified: false,
              code: verificationCode,
              codeExpiration: codeExpirationDate
            }
          }

          const registeredUser = await repository.insertOne(collectionName, userData)

          if (registeredUser) {
            const emailContent = emailTemplates.buildVerifyEmailContent(userEmail, verificationCode)
            const subject = 'ITPortal account verification'
            const sent = await emailSender.sendEmail(userEmail, subject, emailContent)

            if (sent.accepted.length > 0) {
              return 'Succesfully registered. Verification link has been send to your email address.'
            } else {
              throw new Error('Failed when trying to contact email server')
            }
          }
        } else {
          throw new Error('Another account registered with the same email')
        }
      } else {
        throw new Error('Passwords does not match')
      }
    } else {
      throw new Error('Missing params')
    }
  }

  async function loginUser (userEmail, plainPassword) {
    if (userEmail && plainPassword) {
      const criteria = {
        email: userEmail
      }
      const user = await repository.findOne(collectionName, criteria)
      // compare hash & sign token
      if (user) {
        if (user.verification.verified && user.verification.code === '') {
          const passwordMatch = await deps.bcrypt.compare(plainPassword, user.password)

          if (passwordMatch) {
            const payload = {
              id: user._id,
              email: user.email,
              roles: user.roles
            }

            const options = {
              expiresIn: '1d'
            }

            const token = await deps.jwt.sign(payload, deps.config.auth.secret, options)

            return token
          } else {
            throw new Error('Wrong password')
          }
        } else {
          throw new Error('User not verified')
        }
      } else {
        throw new Error('Wrong email')
      }
    } else {
      throw new Error('Missing params')
    }
  }

  async function verifyUser (userEmail, verifyCode) {
    // check if we have user && token
    if (userEmail && verifyCode) {
      const criteria = {
        email: userEmail,
        'verification.code': verifyCode
      }
      const user = await repository.findOne(collectionName, criteria)
      if (user) {
        const now = deps.moment().toDate()
        if (user.verification.codeExpiration > now) {
          const newData = {
            verification: {
              verified: true,
              code: ''
            }
          }
          const updatedUser = await repository.updateOneAndGet(collectionName, user._id, newData)
          if (updatedUser.verification.verified) {
            const responseData = {
              isRedirect: true,
              pageUrl: '/verify.html'
            }
            return responseData
          } else {
            throw new Error('Could not verify the account')
          }
        } else {
          const newData = {
            verification: {
              code: ''
            }
          }
          const removedExpiredToken = await repository.updateOneAndGet(collectionName, user._id, newData)

          if (removedExpiredToken) {
            throw new Error('Verification code expired')
          }
        }
      }
    } else {
      throw new Error('Missing params')
    }
  }

  return {
    registerUser,
    loginUser,
    verifyUser
  }
}

module.exports = authService
