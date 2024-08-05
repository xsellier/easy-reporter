const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.sendDMFeedback(request.auth.credentials.token, request.params.projectId)
    .catch((err) => {
      console.error(`Cannot send DM feedback`)
      console.error(err)

      return Boom.badImplementation('Invalid payload', err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}{projectId}/sendDMFeedback`,
  handler,
  options: {
    description: `Create playtest`,
    validate: {
      params: Joi.object({
        projectId: Joi.number().integer()
      })
    }
  }
}
