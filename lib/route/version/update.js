const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const VersionModule = require('../../module/version')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return VersionModule.update(request.payload.name, request.payload.cracked)
    .catch((err) => {
      return Boom.badImplementation(`Cannot update version ${request.payload.name}`, err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}/update`,
  handler,
  options: {
    description: `Set a version as cracked/uncracked`,
    validate: {
      payload: {
        name: Joi.string(),
        cracked: Joi.boolean()
      }
    }
  }
}
