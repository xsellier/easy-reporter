const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const BugModule = require('../../module/bug')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  console.info(`Upating ${request.payload.version}-${request.payload.title} to ${request.payload.fixed}`)

  return BugModule.update(request.payload.title, request.payload.version, request.payload.fixed)
    .catch((err) => {
      return Boom.badImplementation(`Cannot update bug ${request.payload.version}-${request.payload.title}`, err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}/update`,
  handler,
  options: {
    description: `Set a bug as fixed/unfixed`,
    validate: {
      payload: {
        version: Joi.string(),
        title: Joi.string(),
        fixed: Joi.boolean()
      }
    }
  }
}
