const path = require('path')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return AuthenticationModule.exists()
    .catch((err) => Boom.badImplementation('Cannot retrieve user data', err))
}

module.exports = {
  method: 'GET',
  path: `${prefix}exists`,
  handler,
  options: {
    auth: false,
    description: `Exists`,
    validate: {
    }
  }
}
