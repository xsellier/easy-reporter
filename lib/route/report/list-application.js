const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ReportModule.listApplication()
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot list applications`, err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/list-application/`,
  handler,
  options: {
    description: `List applications`
  }
}
