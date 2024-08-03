const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.insertSteamKey(request.auth.credentials.token, request.params.projectId, request.payload.steamKeyList)
    .catch((err) => {
      console.error(`Cannot update playtest`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}{projectId}/steamKeyList`,
  handler,
  options: {
    description: `Insert steam keys for playtests`,
    validate: {
      params: Joi.object({
        projectId: Joi.number().integer()
      }),
      payload: Joi.object({
        steamKeyList: Joi.array()
      })
    }
  }
}
