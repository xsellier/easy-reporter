const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return AuthenticationModule.logout()
    .catch((err) => Boom.badImplementation('Cannot retrieve user data', err))
}

module.exports = {
  method: 'DELETE',
  path: `${prefix}logout`,
  handler,
  options: {
    description: `Logout`,
    validate: {
    }
  }
}
