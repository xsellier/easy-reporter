const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  console.log(JSON.stringify(request.headers, null, 2))
  return ReportModule.upload(request.headers.authorization, request.headers.applicationid, request.payload)
    .catch((err) => {
      console.error(`Cannot upload report`)
      console.error(err)

      return Boom.badRequest('Invalid payload', err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}`,
  handler,
  options: {
    auth: false,
    description: `Post report`,
    validate: {
      headers: Joi.object({
        Authorization: Joi.string(),
        ApplicationId: Joi.string()
      }).options({ allowUnknown: true })
    },
    payload: {
      output: 'data',
      parse: false,
      maxBytes: 20971520
    }
  }
}
