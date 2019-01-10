const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ReportModule.delete(request.params.filename)
    .catch((err) => {
      return Boom.badImplementation(`Cannot delete report ${request.params.filename}`, err)
    })
}

module.exports = {
  method: 'DELETE',
  path: `${prefix}/{filename}`,
  handler,
  options: {
    description: `Delete a report`,
    validate: {
      params: {
        filename: Joi.string()
      }
    }
  }
}
