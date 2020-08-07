const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const BugModel = require('../../model/bug')
const resources = require('../../resource')
const crypto = require('crypto')

class Bug {

  update (title, version, fixed) {
    return BugModel.create(title, version, fixed)
  }

  list () {
    return BugModel.list()
  }
}

module.exports = new Bug()
