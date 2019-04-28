const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const ReportModule = require('../../module/report')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return ReportModule.download(request.params.filename)
    .then((response) => response)
    .catch((err) => {
      console.error('Cannot download report')
      console.error(err)

      return Boom.badImplementation(`Cannot download report ${request.params.filename}`, err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/{filename}`,
  handler,
  options: {
    description: `Download a report`,
    validate: {
      params: {
        filename: Joi.string()
      }
    }
  }
}
