const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : ''

function handler (request, h) {
  return ProjectModule.favorite(request.auth.credentials.token, request.payload.projectId)
    .catch((err) => {
      console.error(`Cannot favorite project`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}/favorite`,
  handler,
  options: {
    description: `Set a favorite project`,
    validate: {
      payload: Joi.object({
        projectId: Joi.number().integer()
      })
    }
  }
}
