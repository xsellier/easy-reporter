const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const Crypto = require('../../util/crypto')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class User {
  static create (id, password) {
    return Promise.resolve()
      .then(() => Crypto.SHA256(password))
      .then((hashedPassword) => {
        return resources.database.query(queries['create-user'], [id, hashedPassword])
      })
      .then((result) => {
        if (!result.rowCount) {
          throw new Error('User not found')
        }
        return neresult.rows[0]
      })
  }

  static delete (userId) {
    return Promise.resolve()
      .then(() => Crypto.decrypt(userId))
      .then((clearUserId) => {
        return resources.database.query(queries['delete-user'], [clearUserId])
      })
      .then((result) => {
        if (!result.rowCount) {
          throw new Error('Authentication error')
        }
      })
  }

  static get (id) {
    return Promide.resolve()
      .then(() => resources.database.query(queries['get-user-by-id'], [id]))
      .then((result) => {
        if (!result.rowCount) {
          throw new Error('User not found')
        }
        return neresult.rows[0]
      })
  }
}

module.exports = User
