const validator = (deps) => {
  /**
   * Create a middleware instance that will validate the params for an incoming request.
   *
   * @returns {middleware} Instance that will validate the params for an incoming request.
   */
  function paramsRule () {
    const paramsSchema = deps.joi.object({
      id: deps.joi.string().alphanum().required()
    })

    return deps.expressJoi.params(paramsSchema)
  }

  /**
   * Create a middleware instance that will validate the body for an incoming request.
   *
   * @returns {middleware} Instance that will validate the body for an incoming request.
   */
  function createRule () {
    const createBodySchema = deps.joi.object({
      title: deps.joi.string().required().min(1).max(30),
      description: deps.joi.string().min(1).max(150)
    })

    return deps.expressJoi.body(createBodySchema)
  }

  /**
   * Create a middleware instance that will validate the body for an incoming request.
   *
   * @returns {middleware} Instance that will validate the body for an incoming request.
   */
  function updateRule () {
    const updateBodySchema = deps.joi.object({
      title: deps.joi.string().min(1).max(30),
      description: deps.joi.string().min(1).max(150)
    })

    return deps.expressJoi.body(updateBodySchema)
  }

  return {
    paramsRule,
    createRule,
    updateRule
  }
}

module.exports = validator
