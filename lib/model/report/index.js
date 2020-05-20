const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Report {
  static create (filename, debug, platform, version) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-report'], [filename, debug, platform, version])
      })
  }

  static delete (filename) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['delete-report'], [filename])
      })
  }

  static read (filename, value) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['read-report'], [value, filename]))
      .then((result) => {
        if (result == null) {
          throw new Error('Report not found')
        }

        return result
      })
  }

  static upload (filename, value) {
    console.log(`Updating report ${filename} ${value}`)
    return Promise.resolve()
      .then(() => resources.database.query(queries['uploaded-report'], [value, filename]))
      .then((result) => {
        if (result == null) {
          throw new Error('Report not found')
        }

        return result
      })
  }

  static important (filename, value) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['important-report'], [value, filename]))
      .then((result) => {
        if (result == null) {
          throw new Error('Report not found')
        }

        return result
      })
  }

  static list () {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-report'], []))
  }
}

module.exports = Report
