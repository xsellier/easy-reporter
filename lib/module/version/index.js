const VersionModel = require('../../model/version')

class Version {
  update (name, version, cracked) {
    return VersionModel.create(name, version, cracked)
  }

  list (name) {
    return VersionModel.list(name)
  }
}

module.exports = new Version()
