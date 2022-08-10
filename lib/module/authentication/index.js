const uuidv4 = require('uuid/v4')

const Crypto = require('../../util/crypto')
const UserModel = require('../../model/user')
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

  validate (request, token, h) {
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

  login (id, password) {
    return UserModel.get(id)
      .then((user) => {
        if (user == null) {
          throw new Error('Invalid credentials')
        } else if (Crypto.SHA256(password) != user.hashed_password) {
          throw new Error('Invalid credentials')
        } else {
          let token = uuidv4()

          tokens[token] = {
            timeout: setTimeout(clearToken.bind(this, token), tokenTTL),
            userId: id
          }

          return token
        }
      })
  }

  createAdmin (id, password) {
    return this.exists()
      .then((adminExists) => {
        if (adminExists < 1) {
          return UserModel.create(id, password)
        }
      })
      .then(() => this.login(id, password))
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
