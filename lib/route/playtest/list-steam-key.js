const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.listSteamKeyWithDiscordUser(request.auth.credentials.token, request.params.projectId)
    .catch((err) => {
      console.error(`Cannot list steam keys`)
      console.error(err)

      return Boom.badImplementation('Cannot list steam keys', err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}{projectId}/listSteamKey`,
  handler,
  options: {
    description: `List Steam Key`,
    validate: {
      params: Joi.object({
        projectId: Joi.number().integer()
      })
    }
  }
}
