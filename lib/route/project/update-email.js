const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return ProjectModule.updateEmail(request.auth.credentials.token, request.payload.projectId, request.payload.email)
    .catch((err) => {
      console.error(`Cannot update project`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}email`,
  handler,
  options: {
    description: `Update project email`,
    validate: {
      payload: Joi.object({
        email: Joi.string().email(),
        projectId: Joi.number().integer()
      })
    }
  }
}
