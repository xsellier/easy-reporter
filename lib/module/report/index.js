const uuidv4 = require('uuid/v4')
const zlib = require('zlib')
const config = require('config').get('authentication')

const zlibAsync = require('../../util/zlib-async.js')

const BugModel = require('../../model/bug')
const ReportModel = require('../../model/report')
const EmailModel = require('../../model/email')
const ProjectModel = require('../../model/project')

const ProjectModule = require('../../module/project')
const SteamModule = require('../../module/steam')
const resources = require('../../resource')
const crypto = require('crypto')

class Report {
  async upload (token, applicationId, payload) {
    let filename = `/reports/${uuidv4()}.gz`
    const archived = await ProjectModel.isProjectArchived(applicationId)

    if (archived) {
      console.log(`Project archived ${applicationId}, dropping report`)

      throw new Error('Project archived')
    }

    const secretKey = await ProjectModel.getSecretBySteamId(applicationId)
    const hmac = crypto.createHmac('sha256', secretKey).update(payload).digest('base64')

    if (hmac != token) {
      throw new Error('Invalid payload')
    }

    let data = await zlibAsync.gunzip(payload)
    let isReportCracked = false
    let isReportLegit = false

    if (data.application.name == null) {
      data.application.name = 'Unknown application'
    }

    // Check if the version is cracked
    if (data.application.store == 'Steam' && data.application.user_id != null) {
      isReportLegit = await SteamModule.checkAppOwnership(applicationId, data.application.user_id)
      isReportCracked = !isReportLegit
    }

    let manualReport = data.data == null

    if (data.data == null) {
      data.data = {}
    }

    if (data.data.error == null) {
      data.data.error = uuidv4()
    }

    let ignoreBug = await BugModel.isIgnored(data.application.name, data.data.error)
    let isReportSent = await EmailModel.isSent(data.application.name, data.data.error, data.application.version)

    try {
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
    } catch (err) {
      console.error(`Cannot submit email: ${err.message}`)
      console.error(err)
    }

    await ReportModel.create(data.application.name, filename, data.application.debug, data.system.name, data.application.version, data.data.error, isReportCracked, isReportLegit)

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

  delete (token, filename) {
    return ProjectModule.isProjectMemberFromFilename(token, filename)
      .then(() => {
        return new Promise((resolve, reject) => {
          resources.file.delete(filename, (err, json) => {
            if (err) {
              console.error('Cannot delete files')
            }

            resolve()
          })
        })
      })
      .then(() => ReportModel.delete(filename, true))
  }

  list (token, name, page, options) {
    return ProjectModule.isProjectMemberFromName(token, name)
      .then(() => {
        return Promise.all([
          ReportModel.list(name, options, page - 1),
          ReportModel.count(name, options)
        ])
      })
      .then((result) => {
        return {
          list: result[0],
          total: result[1][0].count,
          maxPage: Math.ceil(result[1][0].count / ReportModel.getItemPerPage()),
          page
        }
      })
  }

  async download (token, filename, applicationName) {
    await ProjectModule.isProjectMemberFromName(token, applicationName)

    const data = await {
      then(resolve, _reject) {
        resources.file.download(filename, (err, data) => {
          if (err) {
            _reject(err)
          } else {
            resolve(data)
          }
        })
      }
    }
    await  ReportModel.read(filename, true)

    const result = await ReportModel.getReportDetails(filename)

    return {
      filename, data,
      fixed: result[0].fixed,
      version: result[0].version,
      cracked: result[0].cracked,
      title: result[0].title,
      legit: result[0].legit
    }
  }

  important (token, filename, value = true) {
    return ProjectModule.isProjectMemberFromFilename(token, filename)
      .then(() => {
        return ReportModel.important(filename, value)
      })
  }

  purge (token, name, page, options) {
    return ProjectModule.isProjectMemberFromName(token, name)
      .then(() => {
        return ReportModel.list(name, page, options)
      })
      .then((result) => {
        return Promise.all(result.map((item) => this.delete(item.filename)))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  summary (token, name) {
    return ProjectModule.isProjectMemberFromName(token, name)
      .then(() => {
        return ReportModel.summary(name)
      })
  }

  async listPlatform (token, name) {
    await ProjectModule.isProjectMemberFromName(token, name)
      
    const data = await ReportModel.listPlatform(name)

    return data.map((item) => item.platform)
  }

  async listVersion (token, name) {
    await ProjectModule.isProjectMemberFromName(token, name)

    const data = await ReportModel.listVersion(name)

    return data.map((item) => item.version)
  }

  flagReportAsCracked (token, filename, cracked) {
    return ProjectModule.isProjectMemberFromFilename(token, filename)
      .then(() => {
        return ReportModel.flagReportAsCracked(filename, cracked)
      })
  }
}

module.exports = new Report()
