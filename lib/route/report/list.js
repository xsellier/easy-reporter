const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ReportModule.list(request.params.name, request.params.debug, request.params.uploaded, request.params.deleted, request.params.fixed, request.params.manual, request.params.page)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot list reports`, err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/list/{name}/{debug}/{uploaded}/{deleted}/{fixed}/{manual}/{page}`,
  handler,
  options: {
    description: `List reports`,
    validate: {
      params: {
        name: Joi.string(),
        debug: Joi.boolean(),
        manual: Joi.boolean(),
        uploaded: Joi.boolean(),
        deleted: Joi.boolean(),
        fixed: Joi.boolean(),
        page: Joi.number().integer().min(0)
      }
    }
  }
}
