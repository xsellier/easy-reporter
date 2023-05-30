const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ReportModule.count(request.auth.credentials.token)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot count reports`, err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/count`,
  handler,
  options: {
    description: `Return report count`
  }
}
