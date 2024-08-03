const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.cancelSteamKey(request.auth.credentials.token, request.params.projectId, request.params.steamKeyId)
    .catch((err) => {
      console.error(`Cannot cancel steam key`)
      console.error(err)

      return Boom.badImplementation('Cannot cancel steam key', err)
    })
}

module.exports = {
  method: 'DELETE',
  path: `${prefix}{projectId}/cancel/{steamKeyId}`,
  handler,
  options: {
    description: `Cancel a Steam Key`,
    validate: {
      params: Joi.object({
        projectId: Joi.number().integer(),
        steamKeyId: Joi.number().integer()
      })
    }
  }
}
