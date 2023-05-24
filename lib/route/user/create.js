const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return AuthenticationModule.createUser(request.payload.username, request.payload.password, false)
    .catch((err) => {
      console.error(err)

      return Boom.badRequest('Cannot create user', err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}create`,
  handler,
  options: {
    auth: false,
    description: `Create`,
    validate: {
      payload: {
        username: Joi.string(),
        password: Joi.string()
      }
    }
  }
}