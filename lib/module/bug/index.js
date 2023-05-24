const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const BugModel = require('../../model/bug')
const resources = require('../../resource')
const crypto = require('crypto')

class Bug {
  setFlagFixed (name, title, version, fixed) {
    return BugModel.create(name, title, version, fixed)
  }

  setFlagIgnored (name, title, ignored) {
    return BugModel.ignoreBug(name, title, ignored)
  }

  list (name, page, options) {
    return Promise.all([
      BugModel.list(name, options, page - 1),
      BugModel.count(name, options)
    ])
    .then((result) => {
      return {
        list: result[0],
        total: result[1][0].count,
        maxPage: Math.ceil(result[1][0].count / BugModel.getItemPerPage()),
        page
      }
    })
  }

  info (name, title) {
    return BugModel.info(name, title)
  }
}

module.exports = new Bug()
