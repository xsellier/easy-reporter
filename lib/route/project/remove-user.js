const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ProjectModule.removeUserFromProject(request.auth.credentials.token, request.params.projectId, request.params.userId)
    .catch((err) => {
      console.error(`Cannot create project`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'DELETE',
  path: `${prefix}/{projectId}/user/{userId}`,
  handler,
  options: {
    description: `Remove user from project`,
    validate: {
      params: Joi.object({
        projectId: Joi.number().integer(),
        userId: Joi.number().integer()
      })
    }
  }
}
