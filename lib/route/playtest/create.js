const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.create(request.auth.credentials.token, request.payload.projectId, request.payload.enabled, request.payload.discordChannelId, request.payload.message, request.payload.formUrl)
    .catch((err) => {
      console.error(`Cannot create playtest`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}create`,
  handler,
  options: {
    description: `Create playtest`,
    validate: {
      payload: Joi.object({
        projectId: Joi.number().integer(),
        enabled: Joi.boolean(),
        discordChannelId: Joi.string(),
        message: Joi.string(),
        formUrl: Joi.string()
      })
    }
  }
}
