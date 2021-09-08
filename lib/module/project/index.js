const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const ProjectModel = require('../../model/project')
const resources = require('../../resource')
const crypto = require('crypto')

class Project {
  create(token, name) {
    return Promise.resolve()
      .then(() => resources.authentication.getUserId(token))
      .then((userId) => ProjectModel.create(name, userId))
  }
}

module.exports = new Project()
