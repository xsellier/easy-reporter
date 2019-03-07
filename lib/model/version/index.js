const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Version {
  static create (version, cracked) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-version'], [version, cracked])
      })
  }

  static list () {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-version'], []))
      .then((result) => result.rows)
  }
}

module.exports = Version
