const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const ReportModel = require('../../model/report')
const VersionModel = require('../../model/version')
const EmailModel = require('../../model/email')
const resources = require('../../resource')
const crypto = require('crypto')

class Report {
  upload (token, payload) {
    let filename = `/reports/${uuidv4()}.gz`

    return Promise.resolve()
      .then(() => {
        const hmac = crypto.createHmac('sha256', config.secret_key).update(payload).digest('base64')
        console.log(`token: ${token}, hmac: ${hmac}`)
        if (hmac != token) {
          throw new Error('Invalid payload')
        }
      })
      .then(() => {
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
      })
      .then((data) => {
        if (data.application.name == null) {
          data.application.name = 'Unknown application'
        }

        return VersionModel.isCracked(data.application.name, data.application.version)
          .then((isCracked) => {
            if (isCracked || data.data == null) {
              return true
            }

            return EmailModel.isSent(data.application.name, data.data.error, data.application.version)
          })
          .then((isCrackedOrFixed) => {
            if (isCrackedOrFixed) {
              return
            }
            if (data.data == null) {
              data.data = {}
            }

            let subject = `[${data.application.name}] ${data.application.version}`
            let text = `Error: ${data.data.error}
Function: ${data.data.source_func}
File: ${data.data.source_file} (${data.data.source_line})

Screen: ${data.system.screen.size}
Fullscreen: ${data.system.screen.fullscreen}
Resolution: ${data.system.screen.resolution}
VSync: ${data.system.screen.vsync}

OS: ${data.system.name}
Locale: ${data.system.locale}
Executable: ${data.system.executable}`
            return resources.email.send(subject, text)
          })
          .then(() => EmailModel.create(data.application.name, (data.data != null ? data.data.error : 'Custom report'), data.application.version))
          .catch((err) => {
            console.error(err)
          })
          .then(() => {
            if (data.data == null) {
              data.data = {}
            }

            if (data.data.error == null) {
              data.data.error = uuidv4()
            }

            return ReportModel.create(data.application.name, filename, data.application.debug, data.system.name, data.application.version, data.data.error)
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          return resources.file.upload(filename, payload.toString('base64'), (err, json) => {
            if (err) {
              reject(err)
            } else {
              resolve(json)
            }
          })
        })
      })
      .then(() => ReportModel.upload(filename, true))
  }

  delete (filename) {
    return new Promise((resolve, reject) => {
      resources.file.delete(filename, (err, json) => {
        if (err) {
          console.error('Cannot delete files')
        }

        resolve()
      })
    })
      .then(() => ReportModel.delete(filename, true))
  }

  list (name, debug, uploaded, deleted, fixed, manual, page) {
    return Promise.all([
      ReportModel.list(name, debug, uploaded, deleted, fixed, manual, page - 1),
      ReportModel.count(name, debug, uploaded, deleted, fixed, manual)
    ])
      .then((result) => {
        return {
          list: result[0],
          total: result[1][0].count,
          maxPage: Math.ceil(result[1][0].count / ReportModel.getItemPerPage()),
          page
        }
      })
  }

  download (filename) {
    return new Promise((resolve, reject) => {
      resources.file.download(filename, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
      .then((data) => {
        return ReportModel.read(filename, true)
          .then(() => data)
      })
  }

  important (filename, value = true) {
    return ReportModel.important(filename, value)
  }

  purge (name, debug, uploaded, deleted, fixed, manual) {
    return ReportModel.listAll(name, debug, uploaded, deleted, fixed, manual)
      .then((result) => {
        return Promise.all(result.map((item) => this.delete(item.filename)))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  summary (name) {
    return ReportModel.summary(name)
  }

  listApplication () {
    return ReportModel.listApplication()
      .then((data) => data.map((item) => item.name))
  }
}

module.exports = new Report()
