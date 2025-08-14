const zlib = require('zlib')

class zlibAsync {
  static gunzip (payload) {
    return new Promise((resolve, reject) => {
      zlib.gunzip(payload, (err, buffer) => {
        if (err) {
          console.error(`Cannot extract data from report ${filename}`, err)
          reject(err)
        } else {
          resolve(buffer.toString('utf8'))
        }
      })
    }).then((buffer_utf8) => {
      return JSON.parse(buffer_utf8)

    }).catch((err) => {
      return {}
    })
  }
}

module.exports = zlibAsync
