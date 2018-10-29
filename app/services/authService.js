const authService = (deps, repository, emailSender, emailTemplates) => {
  const collectionName = deps.constants.dbCollections.USERS

  async function registerUser (userEmail, userPassword, passwordConfirm, userRoles) {
    if (userEmail && userPassword && passwordConfirm) {
      if (userPassword === passwordConfirm) {
        const criteria = {
          email: userEmail
        }
        const foundUser = await repository.findOne(collectionName, criteria)

        if (!foundUser) {
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

          const result = await repository.insertOne(collectionName, userData)

          if (result) {
            const emailContent = emailTemplates.buildVerifyEmailContent(userEmail, verificationCode)
            emailSender.sendEmail(userEmail, 'ITPortal account verification', emailContent)
            return 'Succesfully registered. Verification link has been send to your email address.'
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
      if (user.verification.verified && user.verification.code === '') {
        // compare hash & sign token
        if (user) {
          const match = await deps.bcrypt.compare(plainPassword, user.password)

          if (match) {
            const payload = {
              id: user._id,
              email: user.email,
              roles: user.roles
            }

            return deps.jwt.sign(payload, deps.config.auth.secret)
          } else {
            throw new Error('Wrong password')
          }
        } else {
          throw new Error('Wrong email')
        }
      } else {
        throw new Error('User not verified')
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
            const resData = {
              isRedirect: true,
              redirectUrl: '/verify.html'
            }
            return resData
          } else {
            throw new Error('Could not verify the account')
          }
        } else {
          const newData = {
            verification: {
              code: ''
            }
          }
          await repository.updateOneAndGet(collectionName, user._id, newData)

          throw new Error('Verification code expired')
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
