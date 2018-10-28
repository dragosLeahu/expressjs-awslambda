const config = require('../../config/local')

const name = config.app.name

/**
 * Uses 'debug' npm package to print to the console if in development mode.
 *
 * @param {string} moduleName Name of the file from which d is used
 * @returns {function} NPM 'debug' function from module 'debug' with correct application name and file/module name
 */
function d (moduleName) {
  return require('debug')(`${name}:${moduleName}`)
}

module.exports = d
