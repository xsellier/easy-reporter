const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const ProjectModel = require('../../model/project')
const resources = require('../../resource')
const crypto = require('crypto')

class Project {
  create (token, steamId, name, secret, email) {
    return Promise.resolve()
      .then(() => resources.authentication.getUserId(token))
      .then((userId) => ProjectModel.create(name, steamId, userId, secret, email))
  }

  list (token) {
    return Promise.resolve()
      .then(() => resources.authentication.getUserId(token))
      .then((userId) => ProjectModel.list(userId))
  }

  updateEmail (token, projectId, email) {
    return Promise.resolve()
      .then(() => resources.authentication.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(userId, projectId))
      .then(() => ProjectModel.updateEmail(projectId, email))
      .catch((err) => {
        throw new Error('Cannot update project email: ', err)
      })
  }

  updateSecret (token, projectId, secret) {
    return Promise.resolve()
      .then(() => resources.authentication.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(userId, projectId))
      .then(() => ProjectModel.updateSecret(projectId, secret))
      .catch((err) => {
        throw new Error('Cannot update project secret: ', err)
      })
  }

  updateSteamId (token, projectId, steamId) {
    return Promise.resolve()
      .then(() => resources.authentication.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(userId, projectId))
      .then(() => ProjectModel.updateSteamId(projectId, steamId))
      .catch((err) => {
        throw new Error('Cannot update project steam Id: ', err)
      })
  }

  updateName (token, projectId, name) {
    return Promise.resolve()
      .then(() => resources.authentication.getUserId(token))
      .then((userId) => ProjectModel.isProjectAdmin(userId, projectId))
      .then(() => ProjectModel.updateName(name, projectId))
      .catch((err) => {
        throw new Error('Cannot update project name: ', err)
      })
  }

  addUserToProject (userId, projectId, userIdToAdd) {
    return Promise.resolve()
      .then(() => ProjectModel.isProjectAdmin(userId, projectId))
      .then(() => ProjectModel.addUser(userIdToAdd, projectId, false))
      .catch((err) => {
        throw new Error('Cannot add user to project: ', err)
      })
  }

  removeUserFromProject (userId, projectId, userIdToRemove) {
    return Promise.resolve()
      .then(() => ProjectModel.isProjectAdmin(userId, projectId))
      .then(() => ProjectModel.removeUser(userIdToRemove, projectId))
      .catch((err) => {
        throw new Error('Cannot remove user from project: ', err)
      })
  }
}

module.exports = new Project()
