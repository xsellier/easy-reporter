const path = require('path')
const Joi = require('joi')
const Boom = require('boom')
const superagent = require('superagent')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return superagent.get(request.params.param)
    .then((response) => response.body)
    .catch((err) => {
      return Boom.badImplementation(`Cannot send request ${request.params.param}`, err)
    })
}

// Serve public routes
module.exports = {
  method: 'GET',
  path: `${prefix}/{param*}`,
  handler,
  options: {
    description: `Forward request`,
    validate: {
    }
  }
}
