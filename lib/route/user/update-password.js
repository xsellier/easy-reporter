const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return AuthenticationModule.updatePassword(request.payload.oldPassword, request.payload.newPassword)
    .catch((err) => {
      return Boom.badImplementation('Cannot update password', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}password`,
  handler,
  options: {
    description: `Update user password`,
    validate: {
      payload: {
        oldPassword: Joi.string(),
        newPassword: Joi.string()
      }
    }
  }
}
