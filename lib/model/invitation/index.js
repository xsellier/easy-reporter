const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const Crypto = require('../../util/crypto')
const resources = require('../../resource')

const resultPerPage = config.sql.pagination
const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Invitation {
  static _format_query(customized_query, options) {
    var params = []

    if (options.consumed === undefined) {
      customized_query = customized_query.replace('__CONSUMED_CONDITION__', '')
    } else {
      customized_query = customized_query.replace('__CONSUMED_CONDITION__', options.consumed ? 'AND invitation.invite NOT NULL' : 'AND (invitation.invite IS NULL)')
    }

    return {
      customized_query, params
    }
  }

  static createManager (name, owner) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-manager'], [name, owner])
      })
  }

  static getInvitation (name) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['get-invitation'], [name])
      })
      .then((result) => {
        if (result == null || result.length == 0 || result[0] == null) {
          throw new Error('Not no invitation found')
        }

        return result[0]
      })
  }

  static createMember (name, owner, projectId) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['create-member'], [name, owner, projectId])
      })
  }

  static consumeInvitation(name, userId) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['consume-invitation'], [userId, name])
      })
  }

  static listInvitation(userId, projectId, options, page) {
    let query_data = Invitation._format_query(queries['list-invitation'], options)
    let params = [userId, projectId].concat(query_data.params).concat([resultPerPage, page * resultPerPage])

    return Promise.resolve()
      .then(() => resources.database.query(query_data.customized_query, params))
  }

  static listManagerInvitation(options, page) {
    let query_data = Invitation._format_query(queries['list-manager-invitation'], options)
    let params = query_data.params.concat([resultPerPage, page * resultPerPage])

    return Promise.resolve()
      .then(() => resources.database.query(query_data.customized_query, params))
  }

  static countManager (options) {
    let query_data = Invitation._format_query(queries['count-manager-invitation'], options)

    return Promise.resolve()
      .then(() => resources.database.query(query_data.customized_query, query_data.params))
  }

  static count (userId, projectId, options) {
    let query_data = Invitation._format_query(queries['count-invitation'], options)
    let params = [userId, projectId].concat(query_data.params)

    return Promise.resolve()
      .then(() => resources.database.query(query_data.customized_query, params))
  }

  static getItemPerPage () {
    return resultPerPage
  }

  static cancelInvitation(name, userId) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['cancel-invitation'], [name, userId])
      })
  }
}

module.exports = Invitation
