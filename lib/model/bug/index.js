const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Bug {
  static create (title, version, fixed) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-bug'], [title, version, fixed])
      })
  }

  static list () {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-bug'], []))
  }

  static isFixed (title, version) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-fixed'], [title, version]))
      .then((result) => result.length > 0 && result[0].fixed)
  }
}

module.exports = Bug
