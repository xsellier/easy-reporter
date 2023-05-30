const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const InvitationModule = require('../../module/invitation')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return InvitationModule.consumeInvitationNoUserCreation(request.auth.credentials.token, request.payload.invitation)
    .catch((err) => {
      console.error(err)

      return Boom.badRequest('Cannot create user', err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}consume`,
  handler,
  options: {
    description: `Consume an invitation`,
    validate: {
      payload: Joi.object({
        invitation: Joi.string().min(3).max(255)
      })
    }
  }
}
