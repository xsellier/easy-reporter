const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ReportModule.bulkDelete(request.auth.credentials.token, request.payload.reports)
    .catch((err) => {
      return Boom.badImplementation(`Cannot bulkd delete reports (${request.payload.reports.length})`, err)
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
