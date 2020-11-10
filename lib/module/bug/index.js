const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const BugModel = require('../../model/bug')
const resources = require('../../resource')
const crypto = require('crypto')

class Bug {

  update (name, title, version, fixed) {
    return BugModel.create(name, title, version, fixed)
  }

  list (name) {
    return BugModel.list(name)
  }
}

module.exports = new Bug()
