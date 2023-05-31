const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const resultPerPage = config.sql.pagination
const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Report {
  static create (name, filename, debug, platform, version, title, cracked, legit) {
    return Promise.resolve()
      .then(() => {
        var manual_report = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(title)

        return resources.database.query(queries['create-report'], [name, filename, debug, platform, version, title, manual_report, cracked, legit])
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

  static flagReportAsCracked (filename, value) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['flag-report-as-cracked'], [value, filename]))
      .then((result) => {
        if (result == null) {
          throw new Error('Report not found')
        }

        return result
      })
  }

  static upload (filename, value) {
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

  static _format_query(customized_query, options) {
    var params = []

    if (options.debug === undefined) {
      customized_query = customized_query.replace('__DEBUG_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__DEBUG_CONDITION__', options.debug ? 'AND report.debug = 1' : 'AND report.debug = 0')
    }

    if (options.uploaded === undefined) {
      customized_query = customized_query.replace('__UPDLOADED_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__UPDLOADED_CONDITION__', options.uploaded ? 'AND report.uploaded = 1' : 'AND report.uploaded = 0')
    }

    if (options.fixed === undefined) {
      customized_query = customized_query.replace('__FIXED_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__FIXED_CONDITION__', options.fixed ? 'AND bug.fixed = 1' : 'AND (bug.fixed = 0 OR bug.fixed IS NULL)')
    }

    if (options.cracked === undefined) {
      customized_query = customized_query.replace('__CRACKED_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__CRACKED_CONDITION__', options.cracked ? 'AND report.cracked = 1' : 'AND (report.cracked = 0 OR report.cracked IS NULL)')
    }

    if (options.deleted === undefined) {
      customized_query = customized_query.replace('__DELETED_AT_CONDITION__', 'AND report.deleted_at IS NULL')
    } else {
      customized_query = customized_query.replace('__DELETED_AT_CONDITION__', options.deleted ? 'AND report.deleted_at IS NOT NULL' : 'AND report.deleted_at IS NULL')
    }

    if (options.manual === undefined) {
      customized_query = customized_query.replace('__MANUAL_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__MANUAL_CONDITION__', options.manual ? 'AND report.manual = 1' : 'AND report.manual = 0')
    }

    if (options.version === undefined) {
      customized_query = customized_query.replace('__VERSION_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__VERSION_CONDITION__', 'AND report.version = ?')
      params.push(options.version)
    }

    if (options.platform === undefined) {
      customized_query = customized_query.replace('__PLATFORM_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__PLATFORM_CONDITION__', 'AND report.platform = ?')
      params.push(options.platform)
    }

    return {
      customized_query, params
    }
  }

  static list (name, options, page) {
    let query_data = Report._format_query(queries['list-report'], options)
    let params = [name].concat(query_data.params).concat([resultPerPage, page * resultPerPage])

    return Promise.resolve()
      .then(() => resources.database.query(query_data.customized_query, params))
  }

  static listAll (name, options) {
    let query_data = Report._format_query(queries['list-all-report'], options)
    let params = [name].concat(query_data.params)

    return Promise.resolve()
      .then(() => resources.database.query(query_data.customized_query, params))
  }

  static count (name, options) {
    let query_data = Report._format_query(queries['count-report'], options)
    let params = [name] + query_data.params

    return Promise.resolve()
      .then(() => resources.database.query(query_data.customized_query, params))
  }

  static getItemPerPage () {
    return resultPerPage
  }

  static summary (name) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['summary'], [name]))
  }

  static listVersion(name) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-version'], [name]))
  }

  static listApplication () {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-application'], []))
  }

  static listPlatform (name) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['list-platform'], [name]))
  }

  static getReportDetails(filename) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-report-details'], [filename]))
  }
}

module.exports = Report
