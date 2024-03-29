const path = require('path')
const config = require('config')
const uuidv4 = require('uuid/v4')

const sqlLoader = require('../../util/sql-loader')
const Crypto = require('../../util/crypto')
const resources = require('../../resource')

const resultPerPage = 1
const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Project {
  static async create (name, steamId, userId, userSecret, email, apiToken) {
    let secret = userSecret != null ? userSecret : crypto.SHA256(uuidv4())
    let queryName = 'create-project'
    let queryParameters = [steamId, name, secret, apiToken]

    if (email != null) {
      queryName = 'create-project-email'
      queryParameters.push(email)
    }

    const createResult = await resources.database.query(queries[queryName], queryParameters)

    if (createResult == null) {
      throw new Error(`Cannot create project '${name}'`)
    }

    const result = await resources.database.query(queries['get-last-id'])
    await this.addUser(result[0].id, userId, true)

    return {
      secret, id: result[0]
    }
  }

  static get (projectId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-project'], [projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error(`Project not found, id: ${projectId}`)
        }
        return result[0]
      })
  }

  static getProjectEmailBySteamId(steamId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-email'], [steamId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error(`Project not found, application id: ${steamId}`)
        }

        return result[0].email
      })
  }

  static getSecretBySteamId(steamId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-secret'], [steamId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error(`Project not found, application id: ${steamId}`)
        }
        return result[0].secret
      })
  }

  static getApiTokenBySteamId(steamId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-api-token'], [steamId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error(`Project not found, application id: ${steamId}`)
        }
        return result[0].api_token
      })
  }

  static isProjectArchivedFromSteamId(steamId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-project-archived-from-steam-id'], [steamId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error(`Project not found, application id: ${steamId}`)
        }
        return result[0].archived
      })
  }

  static isProjectArchived(projectId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-project-archived'], [projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error(`Project not found, id: ${projectId}`)
        }
        return result[0].archived
      })
  }

  static isProjectAdmin(projectId, userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-project-admin'], [userId, projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error('Not a project admin')
        }
        return true
      })
  }

  static isProjectMember(projectId, userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-project-member'], [userId, projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error('Not a project member')
        }
        return true
      })
  }

  static isProjectFromFilename(userId, filename) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-project-member-from-filename'], [userId, filename]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error('Not a project member')
        }
        return true
      })
  }

  static isProjectMemberFromName(userId, name) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-project-member-from-name'], [userId, name]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error('Not a project member')
        }

        return true
      })
  }

  static updateSteamId (projectId, steamId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['update-steam-id'], [steamId, projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          // Project not found
          return 0
        }
        return steamId
      })
  }

  static archive (projectId, archive) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['archive'], [archive, projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          // Project not found
          return 0
        }
        return archive
      })
  }

  static updateEmail (projectId, email) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['update-email'], [email, projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          // Project not found
          return 0
        }
        return email
      })
  }

  static updateAPIToken (projectId, APIToken) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['update-api-token'], [APIToken, projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          // Project not found
          return 0
        }
        return APIToken
      })
  }

  static updateName (name, projectId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['update-name'], [name, projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          // Project not found
          return 0
        }
        return name
      })
  }

  static updateSecret (projectI, userSecret) {
    return Promise.resolve()
      .then(() => userSecret != null ? userSecret : crypto.SHA256(uuidv4()))
      .then((secret) => {
        return resources.database.query(queries['update-secret'], [secret, projectId])
          .then((result) => {
            if (result == null || result.length == 0 || result[0] == null) {
              // Project not found
              return 0
            }
            return secret
          })
      })
  }

  static getItemPerPage () {
    return resultPerPage
  }

  static listOne (userId, page) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-one-project'], [userId, resultPerPage, page * resultPerPage]))
  }

  static count (userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['count-project'], [userId]))
  }

  static list (userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-project'], [userId]))
  }

  static listMember (projectId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-project-member'], [projectId]))
  }

  static addUser (projectId, userId, isAdmin) {
    let isAdminQuery = isAdmin ? '1' : '0'

    return Promise.resolve()
      .then(() => resources.database.query(queries['add-user-to-project'], [userId, projectId, isAdminQuery]))
  }

  static removeUser (projectId, userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['remove-user-from-project'], [projectId, userId]))
  }

  static deleteProjectFromUserId(userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['remove-project-from-user'], [userId]))
  }

  static getProjectPublic (projectId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-project-public'], [projectId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error(`Project not found, id: ${projectId}`)
        }

        return result[0]
      })
  }
}

module.exports = Project
