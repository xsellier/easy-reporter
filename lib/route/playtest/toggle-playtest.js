const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.togglePlaytest(request.auth.credentials.token, request.params.projectId, request.payload.enabled)
    .catch((err) => {
      console.error(`Cannot update playtest`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}{projectId}/toggle`,
  handler,
  options: {
    description: `Enable / disable playtest`,
    validate: {
      params: Joi.object({
        projectId: Joi.number().integer()
      }),
      payload: Joi.object({
        enabled: Joi.boolean()
      })
    }
  }
}
