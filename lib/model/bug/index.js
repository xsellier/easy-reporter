const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const resultPerPage = config.sql.pagination
const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Bug {

  static _format_query(customized_query, options) {
    var params = []

    if (options.fixed === undefined) {
      customized_query = customized_query.replace('__FIXED_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__FIXED_CONDITION__', options.fixed ? 'AND bug.fixed = 1' : 'AND (bug.fixed = 0 OR bug.fixed IS NULL)')
    }

    if (options.ignored === undefined) {
      customized_query = customized_query.replace('__IGNORE_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__IGNORE_CONDITION__', options.ignored ? 'AND ignored_bug.ignore = 1' : 'AND (ignored_bug.ignore = 0 OR ignored_bug.ignore IS NULL)')
    }

    if (options.version === undefined) {
      customized_query = customized_query.replace('__VERSION_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__VERSION_CONDITION__', 'AND bug.version = ?')
      params.push(options.version)
    }

    return {
      customized_query, params
    }
  }

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

  static list (name, options, page) {
    let query_data = Bug._format_query(queries['list-bug'], options)
    let params = [name].concat(query_data.params).concat([resultPerPage, page * resultPerPage])

    return Promise.resolve()
      .then(() => resources.database.query(query_data.customized_query, params))
  }

  static count (name, options) {
    let query_data = Bug._format_query(queries['count-bug'], options)
    let params = [name].concat(query_data.params)

    return Promise.resolve()
      .then(() => resources.database.query(query_data.customized_query, params))
  }

  static isFixed (name, title, version) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-fixed'], [name, title, version]))
      .then((result) => {
        return result.length > 0 && result[0].fixed
      })
  }

  static isIgnored (name, title) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['is-ignored'], [name, title]))
      .then((result) => {
        return result.length > 0 && result[0].ignored
      })
  }

  static ignoreBug (name, title, ignored) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['ignore-bug'], [name, title, ignored])
      })
  }

  static info (name, title) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['info'], [name, title]))
  }

  static getItemPerPage () {
    return resultPerPage
  }
}

module.exports = Bug
