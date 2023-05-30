const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const Crypto = require('../../util/crypto')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class User {
  static create (name, password, type) {
    return Promise.resolve()
      .then(() => Crypto.SHA256(password))
      .then((hashedPassword) => {
        return resources.database.query(queries['create-user'], [name, hashedPassword, type])
      })
  }

  static delete (userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['delete-user'], [userId]))
  }

  static get (username) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-user-by-username'], [username]))
      .then((result) => {
        if (result == null) {
          throw new Error('User not found')
        }
        return result[0]
      })
  }

  static getUserType(userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-user-type'], [userId]))
      .then((result) => {
        return result[0].type
      })
  }

  static isAdmin(userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-admin'], [userId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error('Not an admin')
        }
        return true
      })
  }

  static isManager(userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-manager'], [userId]))
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error('Not a manager')
        }
        return true
      })
  }

  static listProject(userId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-project'], [userId]))
  }

  static updatePassword(userId, password) {
    return Promise.resolve()
      .then(() => Crypto.SHA256(password))
      .then((hashedPassword) => resources.database.query(queries['update-password'], [hashedPassword, userId]))
  }

  static updateUsername(userId, name) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['update-name'], [name, userId]))
  }

  static exists () {
    return Promise.resolve()
      .then(() => resources.database.query(queries['exists'], []))
      .then((result) => {
        if (result == null) {
          // User not found
          return 0
        }
        return result[0].count
      })
  }
}

module.exports = User
