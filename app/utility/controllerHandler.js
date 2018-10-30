// more about this controllerHandler @ https://stackoverflow.com/questions/41875617/building-enterprise-app-with-node-express

const APIResponse = require('./APIResponse')

/**
 * Handles controller execution and responds to user.
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise. I.e. create.
 * @param params A function (req, res, next), all of which are optional
 * that maps our desired controller parameters. I.e. (req) => [req.params.username, ...].
 * @returns {json} Either a success response or passes the error to the error handler.
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : []
  try {
    const data = await promise(...boundParams)
    if (data.isRedirect) {
      return res.redirect(data.redirectUrl)
    }
    return res.status(200).json(new APIResponse(true, 200, data))
  } catch (error) {
    // pass the error to the 'next' error handler
    return next(error)
  }
}

module.exports = controllerHandler
