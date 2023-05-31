const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : ''

function handler (request, h) {
  return ProjectModule.archive(request.auth.credentials.token, request.payload.projectId, request.payload.archive)
    .catch((err) => {
      console.error(`Cannot archive project`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}/archive`,
  handler,
  options: {
    description: `Archive/unarchive a project`,
    validate: {
      payload: Joi.object({
        projectId: Joi.number().integer(),
        archive: Joi.boolean()
      })
    }
  }
}
