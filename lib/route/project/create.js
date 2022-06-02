const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ProjectModule.create(request.auth.credentials.token, request.payload.name)
    .catch((err) => {
      console.error(`Cannot create project`)
      console.error(err)

      return Boom.badRequest('Invalid payload', err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}create`,
  handler,
  options: {
    description: `Create project`,
    validate: {
      payload: {
        name: Joi.string()
      }
    }
  }
}