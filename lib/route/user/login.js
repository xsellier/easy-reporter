const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return AuthenticationModule.login(request.payload.username, request.payload.password)
    .catch((err) => {
      return Boom.badRequest('Invalid credentials', err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}login`,
  handler,
  options: {
    auth: false,
    description: `Login`,
    validate: {
      payload: Joi.object({
        username: Joi.string(),
        password: Joi.string()
      })
    }
  }
}
