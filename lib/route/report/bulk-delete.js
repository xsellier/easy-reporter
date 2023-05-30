const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return Promise.all(request.payload.reports.map((filename) => ReportModule.delete(request.auth.credentials.token, filename)))
    .catch((err) => {
      return Boom.badImplementation(`Cannot delete report ${request.payload.reports}`, err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}/bulk/delete`,
  handler,
  options: {
    description: `Delete multiple reports`,
    validate: {
      payload: Joi.object({
        reports: Joi.array()
      })
    }
  }
}
