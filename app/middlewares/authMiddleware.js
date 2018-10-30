const authMiddleware = (deps) => {
  function isAuth (...permitedRoles) {
    return (req, res, next) => {
      // get token from headers, check if token contains 'JWT' string
      if (req.headers.auth && req.headers.auth.split(' ')[0] === 'JWT') {
        // if found verify the token (jwt.verify) and get the decoded user from the token
        deps.jwt.verify(req.headers.auth.split(' ')[1], deps.config.auth.secret, function (err, decoded) {
          if (err) {
            return res.status(401).json({ msg: 'Unauthorized' })
          } else {
            req.user = decoded

            if (permitedRoles.length > 0) {
              // check roles
              checkRoles(permitedRoles, decoded, res, next)
            }
          }
        })
      } else {
        return res.status(401).json({ msg: 'Unauthorized' })
      }
    }
  }

  function checkRoles (permitedRoles, user, res, next) {
    // check user roles
    permitedRoles.forEach(permitedRole => {
      if (user.roles.includes(permitedRole)) {
        next()
      } else {
        return res.status(401).json({ msg: 'Unauthorized' })
      }
    })
  }

  return {
    isAuth
  }
}

module.exports = authMiddleware
