const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return AuthenticationModule.updateName(request.auth.credentials.token, request.payload.name)
    .catch((err) => {
      return Boom.badImplementation('Cannot update name', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}name`,
  handler,
  options: {
    description: `Update user name`,
    validate: {
      payload: Joi.object({
        name: Joi.string()
      })
    }
  }
}
