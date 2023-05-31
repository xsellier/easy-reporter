const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const ProjectModel = require('../../model/project')
const UserModel = require('../../model/user')
const AuthenticationModule = require('../../module/authentication')
const resources = require('../../resource')
const crypto = require('crypto')

class Project {
  async create (token, steamId, name, secret, email, apiToken) {
    const userId = AuthenticationModule.getUserId(token)
    const projectData = await ProjectModel.create(name, steamId, userId, secret, email, apiToken)

    try {
      await UserModel.favoriteProject(projectData.id, userId)
    } catch (err) {
      console.error(err)
    }

    return projectData
  }

  list (token) {
    return Promise.resolve()
      .then(() => AuthenticationModule.getUserId(token))
      .then((userId) => ProjectModel.list(userId))
  }

  isProjectMemberFromName(token, name) {
    const userId = AuthenticationModule.getUserId(token)

    return ProjectModel.isProjectMemberFromName(userId, name)
  }

  isProjectMemberFromFilename(token, filename) {
    const userId = AuthenticationModule.getUserId(token)

    return ProjectModel.isProjectFromFilename(userId, filename)
  }

  listMember (token, projectId) {
    const userId = AuthenticationModule.getUserId(token)

    return Promise.resolve()
      .then(() => ProjectModel.isProjectMember(projectId, userId))
      .then(() => ProjectModel.listMember(projectId))
      .catch((err) => {
        throw new Error('Cannot list project member: ', err)
      })
  }

  favorite (token, projectId) {
    const userId = AuthenticationModule.getUserId(token)

    return Promise.resolve()
      .then(() => ProjectModel.isProjectMember(projectId, userId))
      .then(() => UserModel.favoriteProject(projectId, userId))
      .catch((err) => {
        throw new Error('Cannot favorite project: ', err)
      })
  }

  archive (token, projectId, archive) {
    return Promise.resolve()
      .then(() => AuthenticationModule.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(projectId, userId))
      .then(() => ProjectModel.archive(projectId, archive))
      .catch((err) => {
        throw new Error('Cannot archive project: ', err)
      })
  }

  updateEmail (token, projectId, email) {
    return Promise.resolve()
      .then(() => AuthenticationModule.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(projectId, userId))
      .then(() => ProjectModel.updateEmail(projectId, email))
      .catch((err) => {
        throw new Error('Cannot update project email: ', err)
      })
  }

  updateSecret (token, projectId, secret) {
    return Promise.resolve()
      .then(() => AuthenticationModule.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(projectId, userId))
      .then(() => ProjectModel.updateSecret(projectId, secret))
      .catch((err) => {
        throw new Error('Cannot update project secret: ', err)
      })
  }

  updateAPIToken (token, projectId, APIToken) {
    return Promise.resolve()
      .then(() => AuthenticationModule.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(projectId, userId))
      .then(() => ProjectModel.updateAPIToken(projectId, APIToken))
      .catch((err) => {
        throw new Error('Cannot update project API token: ', err)
      })
  }

  updateSteamId (token, projectId, steamId) {
    return Promise.resolve()
      .then(() => AuthenticationModule.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(projectId, userId))
      .then(() => ProjectModel.updateSteamId(projectId, steamId))
      .catch((err) => {
        throw new Error('Cannot update project steam Id: ', err)
      })
  }

  updateName (token, projectId, name) {
    return Promise.resolve()
      .then(() => AuthenticationModule.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(projectId, userId))
      .then(() => ProjectModel.updateName(name, projectId))
      .catch((err) => {
        throw new Error('Cannot update project name: ', err)
      })
  }

  addUserToProject (userId, projectId, userIdToAdd) {
    return Promise.resolve()
      .then(() => ProjectModel.isProjectAdmin(projectId, userId))
      .then(() => ProjectModel.addUser(userIdToAdd, projectId, false))
      .catch((err) => {
        throw new Error('Cannot add user to project: ', err)
      })
  }

  removeUserFromProject (token, projectId, userIdToRemove) {
    const userId = AuthenticationModule.getUserId(token)

    return Promise.resolve()
      .then(() => ProjectModel.isProjectAdmin(projectId, userId))
      .then(() => ProjectModel.removeUser(projectId, userIdToRemove))
      .catch((err) => {
        throw new Error('Cannot remove user from project: ', err)
      })
  }
}

module.exports = new Project()
