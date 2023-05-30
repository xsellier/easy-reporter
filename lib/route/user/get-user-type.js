const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return AuthenticationModule.getUserType(request.auth.credentials.token)
    .catch((err) => {
      return Boom.badImplementation('Cannot get user type', err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}type`,
  handler,
  options: {
    description: `Get user type`,
    validate: {
    }
  }
}
