const zlib = require('zlib')

class zlibAsync {
  static gunzip (payload) {
    return new Promise((resolve, reject) => {
      zlib.gunzip(payload, (err, buffer) => {
        if (err) {
          console.error(`Cannot extract data from report ${filename}`, err)
          reject(err)
        } else {
          resolve(JSON.parse(buffer.toString('utf8')))
        }
      })
    })
  }
}

module.exports = zlibAsync
