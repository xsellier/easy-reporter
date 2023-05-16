const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Bug {
  static create (name, title, version, fixed) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-bug'], [name, title, version, fixed])
      })
  }

  static createOrForget (name, title, version, fixed) {
    return Promise.resolve()
      .then(() => {
        // It's a manual bug report, there's no need to store it in the DB
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(title)) {
          return Promise.resolve()
        }

        return resources.database.query(queries['create-or-forget-bug'], [name, title, version, fixed])
      })
  }

  static list (name) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-bug'], [name]))
  }

  static isFixed (name, title, version) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-fixed'], [name, title, version]))
      .then((result) => {
        return result.length > 0 && result[0].fixed
      })
  }
}

module.exports = Bug
