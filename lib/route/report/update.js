const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return ReportModule.flagReportAsCracked(request.auth.credentials.token, request.payload.filename, request.payload.cracked)
    .catch((err) => {
      return Boom.badImplementation('Cannot update report', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}update`,
  handler,
  options: {
    description: `Flag report as cracked`,
    validate: {
      payload: Joi.object({
        filename: Joi.string(),
        cracked: Joi.boolean()
      })
    }
  }
}
