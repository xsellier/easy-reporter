const uuidv4 = require('uuid/v4')

const Crypto = require('../../util/crypto')
const UserModel = require('../../model/user')
const ProjectModel = require('../../model/project')
const tokenTTL = 1 * 60 * 60 * 1000

let tokens = {}

const clearToken = function (token) {
  if (tokens[token] != null) {
    delete tokens[token]
  }
}

class Authentication {
  getUserId (token) {
    if (tokens[token]) {
      return tokens[token].userId
    }

    throw new Error('Token not valid')
  }

  async setUserBan(token, userIdToBan, banned) {
    const userId = this.getUserId(token)
    
    await UserModel.isAdmin(userId)

    return UserModel.setUserBan(userIdToBan, banned)
  }

  async archiveProject(token, projectId, archive) {
    const userId = this.getUserId(token)
    
    await UserModel.isAdmin(userId)

    return ProjectModel.archive(projectId, archive)
  }

  async listProjectUser(token, userIdToFetch, page) {
    const userId = this.getUserId(token)
    
    await UserModel.isAdmin(userId)

    return Promise.all([
        ProjectModel.listOne(userIdToFetch, page - 1),
        ProjectModel.count(userIdToFetch)
      ])
      .then((result) => {
        return {
          list: result[0],
          total: result[1][0].count,
          maxPage: Math.ceil(result[1][0].count / ProjectModel.getItemPerPage()),
          page
        }
      })
  }

  async listUser(token, page) {
    const userId = this.getUserId(token)
    
    await UserModel.isAdmin(userId)

    return Promise.all([
        UserModel.list(page - 1),
        UserModel.count()
      ])
      .then((result) => {
        return {
          list: result[0],
          total: result[1][0].count,
          maxPage: Math.ceil(result[1][0].count / UserModel.getItemPerPage()),
          page
        }
      })
  }

  updatePassword (token, oldPassword, newPassword) {
    return Promise.resolve()
      .then(() => this.getUserId(token))
      .then((userId) => UserModel.get(userId))
      .then((user) => {
        if (user == null) {
          throw new Error('Invalid credentials')
        } else if (Crypto.SHA256(oldPassword) != user.hashed_password) {
          throw new Error('Invalid credentials')
        } else {
          return UserModel.updatePassword(user.id, newPassword)
        }
      })
  }

  updateName (token, name) {
    return Promise.resolve()
      .then(() => this.getUserId(token))
      .then((userId) => UserModel.updateUsername(userId, name))
  }

  async validate (request, token, h) {
    let access = {
      isValid: false,
      userId: null,
      credentials: {},
      artifacts: {}
    }
    let timeout = tokens[token]

    // Renew authentication token
    if (timeout) {
      clearTimeout(timeout.timeout)

      tokens[token].timeout = setTimeout(clearToken.bind(this, token), tokenTTL)

      access.isValid = true
      access.credentials = { token }
      access.userId = tokens[token].userId
    }

    return access
  }

  login (username, password) {
    return UserModel.get(username)
      .then((user) => {
        if (user == null || user.banned) {
          throw new Error('Invalid credentials')
        } else if (Crypto.SHA256(password) != user.hashed_password) {
          throw new Error('Invalid credentials')
        } else {
          let token = uuidv4()

          tokens[token] = {
            timeout: setTimeout(clearToken.bind(this, token), tokenTTL),
            username: username,
            userId: user.id
          }

          return {
            token, username,
            id: user.id,
            projectId : user.project_id
          }
        }
      })
  }

  getUserType(token) {
    const userId = this.getUserId(token)

    return UserModel.getUserType(userId)
  }

  createUser (username, password, type) {
    return this.exists()
      .then((numberOfUsers) => {
        if (type > 0 || numberOfUsers < 1) {
          return UserModel.create(username, password, type)
        }
      })
      .then(() => this.login(username, password))
  }

  async deleteUser (token, userToDelete) {
    const userId = this.getUserId(token)

    await UserModel.isAdmin(userId)

    if (userId == userToDelete) {
      throw new Error(`Cannot delete an admin, you have to remove its privilege first.`)
    }

    await ProjectModel.deleteProjectFromUserId(userToDelete)

    return UserModel.delete(userToDelete)
  }

  exists () {
    return UserModel.exists()
  }

  logout (token) {
    if (tokens[token] != null) {
      clearTimeout(tokens[token].timeout)
      clearToken(token)
    }

    return Promise.resolve({})
  }
}

module.exports = new Authentication()
