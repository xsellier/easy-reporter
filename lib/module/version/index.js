const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const VersionModel = require('../../model/version')
const resources = require('../../resource')
const crypto = require('crypto')

class Version {
  update (name, version, cracked) {
    return VersionModel.create(name, version, cracked)
  }

  list (name) {
    return VersionModel.list(name)
  }
}

module.exports = new Version()
