const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return ProjectModule.updateSteamId(request.auth.credentials.token, request.payload.projectId, request.payload.applicationId)
    .catch((err) => {
      console.error(`Cannot update project`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}steamId`,
  handler,
  options: {
    description: `Update project steam id`,
    validate: {
      payload: Joi.object({
        applicationId: Joi.number().integer(),
        projectId: Joi.number().integer()
      })
    }
  }
}
