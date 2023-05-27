const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const zlibAsync = require('../../util/zlib-async.js')

const BugModel = require('../../model/bug')
const ReportModel = require('../../model/report')
const EmailModel = require('../../model/email')
const ProjectModel = require('../../model/project')

const SteamModule = require('../../module/steam')
const resources = require('../../resource')
const crypto = require('crypto')

class Report {
  async upload (token, applicationId, payload) {
    let filename = `/reports/${uuidv4()}.gz`
    const secretKey = await ProjectModel.getSecretBySteamId(applicationId)
    const hmac = crypto.createHmac('sha256', secretKey).update(payload).digest('base64')

    if (hmac != token) {
      Promise.reject(new Error('Invalid payload'))
    }

    let data = await zlibAsync.gunzip(payload)
    let isReportCracked = false

    if (data.application.name == null) {
      data.application.name = 'Unknown application'
    }

    // Check if the version is cracked
    if (data.application.store == 'Steam' && data.application.user_id != null) {
      isReportCracked = await SteamModule.checkAppOwnership(applicationId, data.application.user_id)
      isReportCracked = !isReportCracked
    }

    let manualReport = data.data == null
    let ignoreBug = await BugModel.isIgnored(data.application.name, data.data.error)
    let isReportSent = await EmailModel.isSent(data.application.name, data.data.error, data.application.version)

    if (data.data == null) {
      data.data = {}
    }

    if (data.data.error == null) {
      data.data.error = uuidv4()
    }

    if (!manualReport && !isReportCracked && !ignoreBug && !isReportSent) {
      let toEmail = await ProjectModel.getProjectEmailBySteamId(applicationId)
      let subject = `[${data.application.name}] ${data.application.version}`
      let text = `Error: ${data.data.error}
Function: ${data.data.source_func}
File: ${data.data.source_file} (${data.data.source_line})
br
Screen: ${data.system.screen.size}
Fullscreen: ${data.system.screen.fullscreen}
Resolution: ${data.system.screen.resolution}
VSync: ${data.system.screen.vsync}

OS: ${data.system.name}
Locale: ${data.system.locale}
Executable: ${data.system.executable}`

      await resources.email.send(toEmail, subject, text)
      await EmailModel.create(data.application.name, (data.data != null ? data.data.error : 'Custom report'), data.application.version)
    }

    await ReportModel.create(data.application.name, filename, data.application.debug, data.system.name, data.application.version, data.data.error, isReportCracked)

    // Do not create nor update a bug if the version is cracked
    if (!isReportCracked) {
      await BugModel.createOrForget(data.application.name, data.data.error, data.application.version, false)
    }

    await {
      then(resolve, _reject) {
        resources.file.upload(filename, payload.toString('base64'), (err, json) => {
          if (err) {
            _reject(err)
          } else {
            resolve(json)
          }
        })
      }
    }

    return await ReportModel.upload(filename, true)
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

  list (name, page, options) {
    return Promise.all([
      ReportModel.list(name, options, page - 1),
      ReportModel.count(name, options)
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

  download (filename, applicationName) {
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
        .then(() => ReportModel.getReportDetails(filename))
        .then((result) => {
          return { fixed: result[0].fixed, version: result[0].version, cracked: result[0].cracked, title: result[0].title, filename, data }
        })
    })
  }

  important (filename, value = true) {
    return ReportModel.important(filename, value)
  }

  purge (name, page, options) {
    return ReportModel.list(name, page, options)
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

  listPlatform (name) {
    return ReportModel.listPlatform(name)
      .then((data) => data.map((item) => item.platform))
  }

  listVersion (name) {
    return ReportModel.listVersion(name)
      .then((data) => data.map((item) => item.version))
  }

  flagReportAsCracked (filename, cracked) {
    return ReportModel.flagReportAsCracked(filename, cracked)
  }
}

module.exports = new Report()
