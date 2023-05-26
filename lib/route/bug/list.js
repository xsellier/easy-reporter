const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const BugModule = require('../../module/bug')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return BugModule.list(request.params.name, request.params.page, request.payload)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot list bugs`, err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}/list/{name}/{page}`,
  handler,
  options: {
    description: `List bugs`,
    validate: {
      params: Joi.object({
        name: Joi.string(),
        page: Joi.number().integer().min(0)
      }),
      payload: Joi.object({
        fixed: Joi.boolean(),
        ignored: Joi.boolean(),
        version: Joi.string()
      })
    }
  }
}
