const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : ''

function handler (request, h) {
  return AuthenticationModule.listProjectUser(request.auth.credentials.token, request.params.userId, request.params.page)
    .catch((err) => {
      return Boom.badImplementation('Cannot list user', err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/{userId}/project/list/{page}`,
  handler,
  options: {
    description: `List user`,
    validate: {
      params: Joi.object({
        userId: Joi.number().integer(),
        page: Joi.number().integer().min(0)
      })
    }
  }
}
