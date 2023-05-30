const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const InvitationModule = require('../../module/invitation')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}/` : '/'

function handler (request, h) {
  return InvitationModule.cancelInvitation(request.auth.credentials.token, request.params.name)
    .catch((err) => {
      console.error(`Cannot cancel invitation`)
      console.error(err)

      return Boom.badImplementation('Cannot cancel invitation', err)
    })
}

module.exports = {
  method: 'DELETE',
  path: `${prefix}cancel/{name}`,
  handler,
  options: {
    description: `Cancel an invitation`,
    validate: {
      params: Joi.object({
        name: Joi.string()
      })
    }
  }
}
