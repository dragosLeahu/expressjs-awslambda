const validator = (deps) => {
  /**
   * Create a middleware instance that will validate the body for an incoming request.
   *
   * @returns {middleware} Instance that will validate the body for an incoming request.
   */
  function registerRule () {
    const registerSchema = deps.joi.object({
      email: deps.joi.string().required().email(),
      password: deps.joi.string().required().min(8).max(50),
      passwordConfirm: deps.joi.string().valid(deps.joi.ref('password')),
      roles: deps.joi.array().items(deps.joi.string())
    })

    return deps.expressJoi.body(registerSchema)
  }

  /**
 * Create a middleware instance that will validate the body for an incoming request.
 *
 * @returns {middleware} Instance that will validate the body for an incoming request.
 */
  function loginRule () {
    const loginSchema = deps.joi.object({
      email: deps.joi.string().required().email(),
      password: deps.joi.string().required().min(8).max(50)
    })

    return deps.expressJoi.body(loginSchema)
  }

  return {
    registerRule,
    loginRule
  }
}

module.exports = validator
