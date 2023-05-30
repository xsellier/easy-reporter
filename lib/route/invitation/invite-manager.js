const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const InvitationModule = require('../../module/invitation')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return InvitationModule.inviteManager(request.auth.credentials.token)
    .catch((err) => {
      console.error(`Cannot invite a new manager`)
      console.error(err)

      return Boom.badImplementation('Cannot invite a new manager', err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}invite/manager`,
  handler,
  options: {
    description: `Invite a new project manager`,
    validate: {
    }
  }
}
