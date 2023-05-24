const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const BugModule = require('../../module/bug')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return BugModule.setFlagIgnored(request.payload.name, request.payload.title, request.payload.ignore)
    .catch((err) => {
      return Boom.badImplementation(`Cannot update bug ${request.payload.name}-${request.payload.title}`, err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}/ignore`,
  handler,
  options: {
    description: `Set a bug as ignored`,
    validate: {
      payload: {
        name: Joi.string(),
        title: Joi.string(),
        ignore: Joi.boolean()
      }
    }
  }
}
