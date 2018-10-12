const Joi = require('joi')
const expressJoi = require('express-joi-validation')({})

/**
 * Create a middleware instance that will validate the params for an incoming request.
 *
 * @returns {middleware} Instance that will validate the params for an incoming request.
 */
function paramsRule () {
  const paramsSchema = Joi.object({
    id: Joi.string().alphanum().required()
  })

  return expressJoi.params(paramsSchema)
}

/**
 * Create a middleware instance that will validate the body for an incoming request.
 *
 * @returns {middleware} Instance that will validate the body for an incoming request.
 */
function createRule () {
  const createBodySchema = Joi.object({
    title: Joi.string().required().min(1).max(30),
    description: Joi.string().min(1).max(150)
  })

  return expressJoi.body(createBodySchema)
}

/**
 * Create a middleware instance that will validate the body for an incoming request.
 *
 * @returns {middleware} Instance that will validate the body for an incoming request.
 */
function updateRule () {
  const updateBodySchema = Joi.object({
    title: Joi.string().min(1).max(30),
    description: Joi.string().min(1).max(150)
  })

  return expressJoi.body(updateBodySchema)
}

module.exports = { paramsRule, createRule, updateRule }
