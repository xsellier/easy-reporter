const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ReportModule.list(request.params.debug, request.params.uploaded, request.params.deleted, request.params.fixed, request.params.page)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot list reports`, err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/list/{debug}/{uploaded}/{deleted}/{fixed}/{page}`,
  handler,
  options: {
    description: `List reports`,
    validate: {
      params: {
        debug : Joi.boolean(),
        uploaded : Joi.boolean(),
        deleted : Joi.boolean(),
        fixed : Joi.boolean(),
        page: Joi.number().integer().min(0)
      }
    }
  }
}
