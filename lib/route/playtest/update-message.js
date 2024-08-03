const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.updateMessage(request.auth.credentials.token, request.payload.projectId, request.payload.message)
    .catch((err) => {
      console.error(`Cannot update playtest`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}message`,
  handler,
  options: {
    description: `Update message`,
    validate: {
      payload: Joi.object({
        message: Joi.string(),
        projectId: Joi.number().integer()
      })
    }
  }
}
