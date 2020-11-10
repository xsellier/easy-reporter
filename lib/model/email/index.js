const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Email {
  static create (name, title, version) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-email'], [name, title, version])
      })
  }

  static list (name) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-email'], [name]))
  }

  static isSent (name, title, version) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-sent'], [name, title, version]))
      .then((result) => result.length > 0)
  }
}

module.exports = Email
