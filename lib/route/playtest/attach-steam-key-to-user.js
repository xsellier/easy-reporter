const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.attachSteamKeyToUser(request.auth.credentials.token, request.params.projectId, request.payload.discordUserId)
    .catch((err) => {
      console.error(`Cannot attach steam key to user`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}{projectId}/attachSteamKeyToUser`,
  handler,
  options: {
    description: `Attach Steam Key To User`,
    validate: {
      params: Joi.object({
        projectId: Joi.number().integer()
      }),
      payload: Joi.object({
        discordUserId: Joi.string()
      })
    }
  }
}
