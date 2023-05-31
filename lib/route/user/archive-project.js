const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const AuthenticationModule = require('../../module/authentication')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : ''

function handler (request, h) {
  return AuthenticationModule.archiveProject(request.auth.credentials.token, request.payload.projectId, request.payload.archive)
    .catch((err) => {
      return Boom.badImplementation('Cannot list user', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}/project/archive`,
  handler,
  options: {
    description: `Archive project`,
    validate: {
      payload: Joi.object({
        projectId: Joi.number().integer(),
        archive: Joi.boolean()
      })
    }
  }
}
