const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const BugModule = require('../../module/bug')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return BugModule.list(request.params.name)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot list bugs`, err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/list/{name}`,
  handler,
  options: {
    description: `List bugs`,
    validate: {
      params: {
        name: Joi.string()
      }
    }
  }
}
