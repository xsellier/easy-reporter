const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const resultPerPage = config.sql.pagination
const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Report {
  static create (filename, debug, platform, version, title) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-report'], [filename, debug, platform, version, title])
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

  static list (debug, uploaded, deleted, page) {
    let customized_query = queries['list-report']
      .replace('__DELETED__', (deleted) ? ' NOT' : '')

    return Promise.resolve()
      .then(() => resources.database.query(customized_query, [
        (debug) ? 1 : 0,
        (uploaded) ? 1 : 0,
        resultPerPage,
        page * resultPerPage
      ]))
  }

  static count (debug, uploaded, deleted) {
    let customized_query = queries['count-report']
      .replace('__DELETED__', (deleted) ? ' NOT' : '')

    return Promise.resolve()
      .then(() => resources.database.query(customized_query, [
        (debug) ? 1 : 0,
        (uploaded) ? 1 : 0
      ]))
  }

  static getItemPerPage() {
    return resultPerPage
  }
}


module.exports = Report
