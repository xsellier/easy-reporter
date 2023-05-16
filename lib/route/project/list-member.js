const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ProjectModule = require('../../module/project')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return ProjectModule.listMember(request.auth.credentials.token, request.params.projectId)
    .catch((err) => {
      console.error(`Cannot list project member`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}{projectId}/list-member`,
  handler,
  options: {
    description: `List projects members`,
    validate: {
    }
  }
}
