const Joi = require('joi')
const expressJoi = require('express-joi-validation')({})

module.exports.paramsRule = () => {
  const paramsSchema = Joi.object({
    id: Joi.string().alphanum().required()
  })

  return expressJoi.params(paramsSchema)
}

module.exports.createRule = () => {
  const createBodySchema = Joi.object({
    title: Joi.string().required().min(1).max(30),
    description: Joi.string().min(1).max(150)
  })

  return expressJoi.body(createBodySchema)
}

module.exports.updateRule = () => {
  const updateBodySchema = Joi.object({
    title: Joi.string().min(1).max(30),
    description: Joi.string().min(1).max(150)
  })

  return expressJoi.body(updateBodySchema)
}