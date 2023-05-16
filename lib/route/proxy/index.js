const path = require('path')
const Joi = require('joi')
const Boom = require('boom')
const requester = require('request')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {

  console.log(`Querying: ${request.params.param}...`)
  return new Promise((resolve, reject) => {
    requester.get({
      url: request.params.param
    }, (err, response, body) => {
      if (err) {
        return reject(err)
      }

      return resolve(body)
    })
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
