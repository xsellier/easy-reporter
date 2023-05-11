const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Version {
  static create (name, version, cracked) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-version'], [name, version, cracked])
      })
  }

  static createOrUpdate (name, version, cracked) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-or-update-version'], [name, version, cracked])
      })
  }

  static list (name) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-version'], [name]))
  }

  static isCracked (name, version) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-cracked'], [name, version]))
      .then((result) => result.length > 0 && result[0].cracked)
  }
}

module.exports = Version
