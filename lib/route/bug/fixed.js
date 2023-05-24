const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const BugModule = require('../../module/bug')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return BugModule.setFlagFixed(request.payload.name, request.payload.title, request.payload.version, request.payload.fixed)
    .catch((err) => {
      return Boom.badImplementation(`Cannot update bug ${request.payload.version}-${request.payload.title}`, err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}/fixed`,
  handler,
  options: {
    description: `Set a bug as fixed/unfixed`,
    validate: {
      payload: {
        name: Joi.string(),
        version: Joi.string(),
        title: Joi.string(),
        fixed: Joi.boolean()
      }
    }
  }
}
