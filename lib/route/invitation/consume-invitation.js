const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const InvitationModule = require('../../module/invitation')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return InvitationModule.consumeInvitation(request.payload.invitation, request.payload.username, request.payload.password)
    .catch((err) => {
      console.error(err)

      return Boom.badRequest('Cannot create user', err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}consume`,
  handler,
  options: {
    auth: false,
    description: `Consume an invitation`,
    validate: {
      payload: Joi.object({
        invitation: Joi.string().min(3).max(255),
        username: Joi.string().min(3).max(255),
        password: Joi.string().min(3).max(255)
      })
    }
  }
}
