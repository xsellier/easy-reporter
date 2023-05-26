const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ReportModule.purge(request.params.name, request.params.page, request.payload)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot purge reports`, err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}/purge/{name}/{page}`,
  handler,
  options: {
    description: `Purge reports reports`,
    validate: {
      params: Joi.object({
        name: Joi.string(),
        page: Joi.number().integer().min(0)
      }),
      payload: Joi.object({
        debug: Joi.boolean(),
        manual: Joi.boolean(),
        uploaded: Joi.boolean(),
        deleted: Joi.boolean(),
        fixed: Joi.boolean(),
        version: Joi.string(),
        platform: Joi.string(),
        duration: Joi.object({
          from: Joi.date().required(),
          to: Joi.date().min(Joi.ref('from')).required()
        })
      })
    }
  }
}
