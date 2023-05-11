const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return AuthenticationModule.updateName(request.payload.name)
    .catch((err) => {
      return Boom.badRequest('Cannot update name', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}name`,
  handler,
  options: {
    description: `Update user name`,
    validate: {
      payload: {
        name: Joi.string()
      }
    }
  }
}
