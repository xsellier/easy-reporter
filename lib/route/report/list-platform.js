const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ReportModule.listPlatform(request.auth.credentials.token, request.params.name)
    .catch((err) => {
      return Boom.badImplementation(`Cannot list platforms`, err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/list-platform/{name}`,
  handler,
  options: {
    description: `List platforms`,
    validate: {
      params: Joi.object({
        name: Joi.string()
      })
    }
  }
}
