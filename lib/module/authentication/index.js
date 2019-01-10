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
  validate (request, token, h) {
    let access = {
      isValid: false,
      credentials: {},
      artifacts: {}
    }
    let timeout = tokens[token]

    // Renew authentication token
    if (timeout) {
      clearTimeout(timeout)

      tokens[token] = setTimeout(clearToken.bind(this, token), tokenTTL)

      access.isValid = true
      access.credentials = { token }
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

          tokens[token] = setTimeout(clearToken.bind(this, token), tokenTTL)

          return token
        }
      })
  }

  logout (token) {
    if (tokens[token] != null) {
      clearTimeout(tokens[token])
      clearToken(token)
    }

    return Promise.resolve({})
  }
}

module.exports = new Authentication()
