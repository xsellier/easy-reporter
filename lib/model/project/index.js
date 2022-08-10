const path = require('path')
const config = require('config')
const uuidv4 = require('uuid/v4')

const sqlLoader = require('../../util/sql-loader')
const Crypto = require('../../util/crypto')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Project {
  static create (name, userId) {
    return Promise.resolve()
      .then(() => uuidv4())
      .then((secret) => {
        return resources.database.query(queries['create-project'], [name, secret, userId])
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

  static update (projectId, name) {
    return Promise.resolve()
      .then(() => uuidv4())
      .then((secret) => resources.database.query(queries['update-project'], [name, secret, projectId]))
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
    return Promise.resolve()
      .then(() => resources.database.query(queries['add-user-to-project'], [userId, projectId, isAdmin]))
  }

  static removeUser (projectId, userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['remove-user-from-project'], [projectId, userId, userId]))
  }
}

module.exports = Project
