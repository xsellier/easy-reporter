const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Report {
  static create (filename) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-report'], [filename])
      })
  }

  static delete (filename) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['delete-report'], [filename])
      })
      .then((result) => {
        if (result.rowCount != 1) {
          throw new Error('Report not found')
        }

        return result.rows
      })
  }

  static read (filename, value) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['read-report'], [filename, value]))
      .then((result) => {
        if (!result.rowCount) {
          throw new Error('Report not found')
        }

        return result.rows
      })
  }

  static upload (filename, value) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['uploaded-report'], [filename, value]))
      .then((result) => {
        if (!result.rowCount) {
          throw new Error('Report not found')
        }

        return result.rows
      })
  }

  static important (filename, value) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['important-report'], [filename, value]))
      .then((result) => {
        if (!result.rowCount) {
          throw new Error('Report not found')
        }

        return result.rows
      })
  }
}

module.exports = Report
