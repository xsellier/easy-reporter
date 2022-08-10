const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const Crypto = require('../../util/crypto')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class User {
  static create (name, password) {
    return Promise.resolve()
      .then(() => Crypto.SHA256(password))
      .then((hashedPassword) => {
        return resources.database.query(queries['create-user'], [name, hashedPassword])
      })
  }

  static delete (userId) {
    return Promise.resolve()
      .then(() => Crypto.decrypt(userId))
      .then((clearUserId) => {
        return resources.database.query(queries['delete-user'], [clearUserId])
      })
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
