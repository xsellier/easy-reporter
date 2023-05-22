const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const BugModule = require('../../module/bug')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return BugModule.info(request.params.name, request.payload.title)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot get bug informations`, err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}/info/{name}`,
  handler,
  options: {
    description: `List bugs`,
    validate: {
      params: {
        name: Joi.string()
      },
      payload: {
        title: Joi.string()
      }
    }
  }
}
