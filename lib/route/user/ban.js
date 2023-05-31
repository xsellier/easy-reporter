const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : ''

function handler (request, h) {
  return AuthenticationModule.setUserBan(request.auth.credentials.token, request.payload.id, request.payload.banned)
    .catch((err) => {
      return Boom.badImplementation('Cannot update user banishment', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}/ban`,
  handler,
  options: {
    description: `Update user banishment`,
    validate: {
      payload: Joi.object({
        id: Joi.number().integer(),
        banned: Joi.boolean()
      })
    }
  }
}
