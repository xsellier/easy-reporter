const uuidv4 = require('uuid/v4')

const ProjectModel = require('../../model/project')
const UserModel = require('../../model/user')
const InvitationModel = require('../../model/invitation')

const AuthenticationModule = require('../../module/authentication')

class Invitation {
  inviteManager (token) {
    const name = uuidv4()
    const userId = AuthenticationModule.getUserId(token)

    return UserModel.isAdmin(userId)
      .then(() => {
        return InvitationModel.createManager(name, userId)
      })
      .then(() => {
        return name
      })
  }

  inviteMember (token, projectId) {
    const name = uuidv4()
    const userId = AuthenticationModule.getUserId(token)

    return ProjectModel.isProjectAdmin(projectId, userId)
      .then(() => {
        return InvitationModel.count(userId, projectId, { consumed: false })
      })
      .then((result) => {
        if (result[0].count > 10) {
          throw Error('Cannot create more invitation')
        }
        return InvitationModel.createMember(name, userId, projectId)
      })
      .then(() => {
        return name
      })
  }

  cancelInvitation (token, name) {
    const userId = AuthenticationModule.getUserId(token)

    return InvitationModel.cancelInvitation(name, userId)
  }

  listInvitation (token, projectId, options, page) {
    const userId = AuthenticationModule.getUserId(token)

    return Promise.all([
      InvitationModel.listInvitation(userId, projectId, options, page - 1),
      InvitationModel.count(userId, projectId, options)
    ])
    .then((result) => {
      return {
        list: result[0],
        total: result[1][0].count,
        maxPage: Math.ceil(result[1][0].count / InvitationModel.getItemPerPage()),
        page
      }
    })
  }

  async consumeInvitationNoUserCreation(token, name) {
    const invitation = await InvitationModel.getInvitation(name)
    const userId = AuthenticationModule.getUserId(token)

    if (invitation.project_id == null) {
      throw new Error('Invalid invitation, no project attached')
    }

    await ProjectModel.addUser(invitation.project_id, userId, false)
    await InvitationModel.consumeInvitation(name, userId)

    return ProjectModel.getProjectPublic(invitation.project_id)
  }

  async consumeInvitation (name, username, password) {
    const invitation = await InvitationModel.getInvitation(name)
    const token = await AuthenticationModule.createUser(username, password, invitation.type)
    const userId = AuthenticationModule.getUserId(token)

    if (invitation.type == 2 && invitation.project_id != null) {
      await ProjectModel.addUser(invitation.project_id, userId, false)
    }

    await InvitationModel.consumeInvitation(name, userId)

    return token
  }
}

module.exports = new Invitation()
