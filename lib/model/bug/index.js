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
