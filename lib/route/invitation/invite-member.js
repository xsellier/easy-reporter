const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const InvitationModule = require('../../module/invitation')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return InvitationModule.inviteMember(request.auth.credentials.token, request.payload.projectId)
    .catch((err) => {
      console.error(`Cannot invite a new member`)
      console.error(err)

      return Boom.badImplementation('Cannot invite a new member', err)
    })
}

module.exports = {
  method: 'POST',
  path: `${prefix}invite/member`,
  handler,
  options: {
    description: `Invite a new project member`,
    validate: {
      payload: Joi.object({
        projectId: Joi.number().integer()
      })
    }
  }
}
