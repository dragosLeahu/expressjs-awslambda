const authService = (deps, repository) => {
  let collectionName = deps.constants.dbCollections.USERS

  async function registerUser (userEmail, userPassword, passwordConfirm, userRoles) {
    if (userEmail && userPassword && passwordConfirm) {
      if (userPassword === passwordConfirm) {
        let criteria = {
          email: userEmail
        }
        let foundUser = await repository.findOne(collectionName, criteria)

        if (!foundUser) {
          const saltRounds = 10
          let hash = await deps.bcrypt.hash(userPassword, saltRounds)

          let userData = {
            email: userEmail,
            password: hash,
            roles: userRoles,
            verified: false
          }

          let result = await repository.insertOne(collectionName, userData)

          if (result) {
            return 'Succesfully registered'
          }
        } else {
          throw new Error('Another account registered with this email')
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
      let user = await repository.findOne(collectionName, criteria)

      // compare hash & sign token
      if (user) {
        let match = await deps.bcrypt.compare(plainPassword, user.password)

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
      throw new Error('Missing params')
    }
  }

  return {
    registerUser,
    loginUser
  }
}

module.exports = authService
