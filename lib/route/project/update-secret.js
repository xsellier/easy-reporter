const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ProjectModule.updateSecret(request.auth.credentials.token, request.payload.projectId, request.payload.secret)
    .catch((err) => {
      console.error(`Cannot update project`)
      console.error(err)

      return Boom.badRequest('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}secret`,
  handler,
  options: {
    description: `Generate a new project secret`,
    validate: {
      payload: {
        projectId: Joi.number().integer(),
        secret: Joi.string().optional()
      }
    }
  }
}
