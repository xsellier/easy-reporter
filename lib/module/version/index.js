const ReportModel = require('../../model/report')

class Version {

  list (name) {
    return ReportModel.listVersion(name)
  }
}

module.exports = new Version()
