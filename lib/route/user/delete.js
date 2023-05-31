const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return AuthenticationModule.deleteUser(request.auth.credentials.token, request.params.userId)
    .catch((err) => {
      return Boom.badImplementation('Delete user', err)
    })
}

module.exports = {
  method: 'DELETE',
  path: `${prefix}/{userId}`,
  handler,
  options: {
    description: `Delete user`,
    validate: {
      params: Joi.object({
        userId: Joi.number().integer()
      })
    }
  }
}
