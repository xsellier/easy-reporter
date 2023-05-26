const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const SteamModule = require('../../module/steam')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return SteamModule.doesUserReviewed(request.params.application_id, request.params.user_id)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot get the user review`, err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}/review/{application_id}/{user_id}`,
  handler,
  options: {
    description: `Return true if the user left a review, otherwise false`,
    validate: {
      params: Joi.object({
        application_id: Joi.number(),
        user_id: Joi.number().unsafe()
      })
    }
  }
}
