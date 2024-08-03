const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.updateFormUrl(request.auth.credentials.token, request.payload.projectId, request.payload.formUrl)
    .catch((err) => {
      console.error(`Cannot update playtest`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}formUrl`,
  handler,
  options: {
    description: `Update form URL`,
    validate: {
      payload: Joi.object({
        formUrl: Joi.string(),
        projectId: Joi.number().integer()
      })
    }
  }
}
