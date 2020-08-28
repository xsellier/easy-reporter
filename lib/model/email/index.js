const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Email {
  static create (title, version) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-email'], [title, version])
      })
  }

  static list () {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-email'], []))
  }

  static isSent (title, version) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-sent'], [title, version]))
      .then((result) => result.length > 0)
  }
}

module.exports = Email
