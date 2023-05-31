const path = require('path')
const Joi = require('joi')
const Boom = require('boom')

const InvitationModule = require('../../module/invitation')

const directory = path.basename(path.dirname(__filename)).replace('_root', '')
const prefix = directory ? `/${directory}` : '/'

function handler (request, h) {
  return InvitationModule.listManagerInvitation(request.auth.credentials.token, request.payload, request.params.page)
    .then((response) => response)
    .catch((err) => {
      return Boom.badImplementation(`Cannot list invitations`, err)
    })
}

module.exports = {
  method: 'PUT',
  path: `${prefix}/list/manager/{page}`,
  handler,
  options: {
    description: `List invitations`,
    validate: {
      params: Joi.object({
        page: Joi.number().integer().min(0)
      }),
      payload: Joi.object({
        consumed: Joi.boolean().optional()
      })
    }
  }
}
