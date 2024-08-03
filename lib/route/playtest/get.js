const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const PlaytestModule = require('../../module/playtest')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return PlaytestModule.get(request.auth.credentials.token, request.params.projectId)
    .catch((err) => {
      console.error(`Cannot get playtest`)
      console.error(err)

      return Boom.badImplementation('Cannot get playtest', err)
    })
}

module.exports = {
  method: 'GET',
  path: `${prefix}{projectId}`,
  handler,
  options: {
    description: `Get playtest by playtest id`,
    validate: {
      params: Joi.object({
        projectId: Joi.number().integer()
      })
    }
  }
}
