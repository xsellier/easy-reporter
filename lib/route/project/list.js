const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return ProjectModule.list(request.auth.credentials.token)
    .catch((err) => {
      console.error(`Cannot list project`)
      console.error(err)

      return Boom.badImplementation('Cannot list', err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}list`,
  handler,
  options: {
    description: `List projects`,
    validate: {
    }
  }
}
