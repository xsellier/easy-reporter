const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return ProjectModule.updateName(request.auth.credentials.token, request.payload.projectId, request.payload.name)
    .catch((err) => {
      console.error(`Cannot update project`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}name`,
  handler,
  options: {
    description: `Update project name`,
    validate: {
      payload: Joi.object({
        name: Joi.string(),
        projectId: Joi.number().integer()
      })
    }
  }
}
