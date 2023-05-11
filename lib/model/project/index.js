const path = require('path')
const config = require('config')
const uuidv4 = require('uuid/v4')

const sqlLoader = require('../../util/sql-loader')
const Crypto = require('../../util/crypto')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Project {
  static create (name, steamId, userId, userSecret, email) {
    return Promise.resolve()
      .then(() => userSecret != null ? userSecret : crypto.SHA256(uuidv4()))
      .then((secret) => {
        if (email != null) {
          return resources.database.query(queries['create-project-email'], [steamId, name, secret, email, userId])
        } else {
          return resources.database.query(queries['create-project'], [steamId, name, secret, userId])
        }
      })
      .then((result) => {
        if (result == null) {
          throw new Error(`Cannot create project '${name}'`)
        }
        return result[0]
      })
  }

  static get (projectId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-project'], [projectId]))
      .then((result) => {
        if (result == null) {
          throw new Error('Project not found')
        }
        return result[0]
      })
  }

  static getProjectEmailBySteamId(steamId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-email'], [steamId]))
      .then((result) => {
        if (result == null) {
          throw new Error('Invalid project id')
        }
        return result[0]
      })
  }

  static getSecretBySteamId(steamId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-secret'], [steamId]))
      .then((result) => {
        if (result == null) {
          throw new Error('Invalid project id')
        }
        return result[0]
      })
  }

  static isProjectAdmin(projectId, userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-project-admin'], [userId, projectId]))
      .then((result) => {
        if (result == null) {
          throw new Error('Not an admin')
        }
        return result[0]
      })
  }

  static updateSteamId (projectId, steamId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['update-steam-id'], [steamId, projectId]))
      .then((result) => {
        if (result == null) {
          // Project not found
          return 0
        }
        return result[0].steam_id
      })
  }

  static updateEmail (projectId, email) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['update-email'], [email, projectId]))
      .then((result) => {
        if (result == null) {
          // Project not found
          return 0
        }
        return result[0].email
      })
  }

  static updateName (projectId, name) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['update-name'], [name, projectId]))
      .then((result) => {
        if (result == null) {
          // Project not found
          return 0
        }
        return result[0].name
      })
  }

  static updateSecret (projectI, userSecret) {
    return Promise.resolve()
      .then(() => userSecret != null ? userSecret : crypto.SHA256(uuidv4()))
      .then((secret) => resources.database.query(queries['update-secret'], [secret, projectId]))
      .then((result) => {
        if (result == null) {
          // Project not found
          return 0
        }
        return result[0].secret
      })
  }

  static list (userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-project'], [userId]))
  }

  static addUser (projectId, userId, isAdmin) {
    let isAdminQuery = isAdmin ? '1' : '0'

    return Promise.resolve()
      .then(() => resources.database.query(queries['add-user-to-project'], [userId, projectId, isAdminQuery]))
  }

  static removeUser (projectId, userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['remove-user-from-project'], [projectId, userId, userId]))
  }
}

module.exports = Project
