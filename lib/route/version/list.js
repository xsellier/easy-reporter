const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const VersionModule = require('../../module/version')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return VersionModule.list(request.params.application_name)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot list versions`, err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/list/{application_name}`,
  handler,
  options: {
    description: `List versions`,
    validate: {
      params: {
        application_name : Joi.string()
      }
    }
  }
}
