const crypto = require('crypto')

const charset = 'utf8'
const binaryType = 'hex'
const hashMethod = 'sha256'

class Crypto {
  constructor (key, algorithm) {
    if (key == null) {
      throw new Error('Missing key for encryption')
    }

    this.algorithm = algorithm || 'aes-128-ecb'
    this.key = key
  }

  encrypt (text) {
    let cipher = crypto.createCipher(this.algorithm, this.key)

    return `${cipher.update(text, charset, binaryType)}${cipher.final(binaryType)}`
  }

  decrypt (text) {
    let decipher = crypto.createDecipher(this.algorithm, this.key)

    return `${decipher.update(text, binaryType, charset)}${decipher.final(charset)}`
  }

  static SHA256 (text) {
    return crypto.createHash(hashMethod).update(text).digest(binaryType)
  }
}

module.exports = Crypto
