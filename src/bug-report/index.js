export default {
  name: 'BugReports',
  components: {
  },
  data () {
    return {
      versions: {},
      versionKeys: [],
      versionSelected: 'None',
      reports: [],
      version: [],
      bugs: {},
      reportsBulkDelete: [],
      manual: false,
      cache: {},
      report: null,
      username: '',
      password: '',
      filename: null,
      sending: false,
      token: null,
      debug: false,
      deleted: false,
      uploaded: true,
      fixed: false,
      cracked: false,
      selectAllValue: false,
      totalPages: 1,
      currentPage: 1,
      totalItems: 0,
      application_name: '',
      selectedReport: null
    }
  },
  computed: {
    filteredReports: function () {
      let self = this

      return this.reports.filter(report => {
        // Validate uploaded filter
        var valid = report.uploaded == self.uploaded

        // Validate deleted filter
        valid &= (report.deleted_at != null) == self.deleted

        // Validate debug filter
        valid &= report.debug == self.debug

        if (self.versionSelected != 'None') {
          valid &= report.version == self.versionSelected
        }

        // Validate crack filter
        var cracked = false

        if (self.versions[report.version] != null) {
          cracked = self.versions[report.version]
        }

        valid &= cracked == self.cracked

        return valid
      })
    }
  },
  methods: {
    isSelected: function (reportName) {
      return reportName == this.selectedReport
    },
    selectAll: function () {
      if (this.reportsBulkDelete.length < this.filteredReports.length) {
        this.reportsBulkDelete = this.filteredReports.map((report) => report.filename)
      } else {
        this.reportsBulkDelete = []
      }
    },
    bulkDelete: function () {
      this.sending = true

      this.$http({
        method: 'POST',
        url: `/report/bulk/delete`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          reports: this.reportsBulkDelete
        }
      })
        .then(() => {
          this.report = null
          this.filename = null

          this.sending = false
          this.reportsBulkDelete = []

          return this.list()
        })
        .catch((err) => {
          if (err.response && err.response.status < 500) {
            this.token = null
          }

          this.sending = false
          this.$emit('error', this.token, `Cannot delete reports: ${err.message}`)
        })
    },
    formatCallstack: function (callstack) {
      return callstack.reduce((acc, item, index) => {
        let computed_index = parseInt(Math.floor(index / 2), 10)

        if (index % 2 == 0) {
          acc[computed_index] = {
            name: item
          }
        } else {
          acc[computed_index].line = item
        }

        return acc
      }, [])
    },
    downloadReport: function () {
      var dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(this.report, null, 2))
      var downloadAnchorNode = document.createElement('a')

      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', this.filename + '.json')
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    },
    deleteReport: function () {
      this.sending = true

      this.$http({
        method: 'DELETE',
        url: `/report/${encodeURIComponent(this.filename)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then(() => {
          this.report = null
          this.filename = null

          this.sending = false

          return this.list()
        })
        .catch((err) => {
          if (err.response && err.response.status < 500) {
            this.token = null
          }

          this.sending = false
          this.$emit('error', this.token, `Cannot delete report: ${err.message}`)
        })
    },
    info: function (report) {
      this.selectedReport = null
      this.report = null
      this.filename = null

      if (report.deleted_at != null || !report.uploaded) {
        return
      }

      this.sending = true

      this.$http({
        method: 'get',
        url: `/report/${encodeURIComponent(report.filename)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then((response) => {
          let rawReport = pako.ungzip(atob(response.data), { to: 'string' })

          this.filename = report.filename
          this.report = JSON.parse(rawReport)
          this.report.version = report.version
          this.report.title = report.title
          this.report.cracked = this.versions[this.report.version] || false
          this.report.fixed = (this.bugs[report.version] != null && this.bugs[report.version][report.title] != null) ? this.bugs[report.version][report.title] : false
          this.sending = false

          this.selectedReport = report.filename
        })
        .catch((err) => {
          if (err.response && err.response.status < 500) {
            this.token = null
          }

          this.sending = false
          this.$emit('error', this.token, `Cannot download report: ${err.message}`)
        })
    },
    flagVersionAsCracked: function () {
      return this._setFlagVersionCracked(true)
    },
    unflagVersionAsCracked: function () {
      return this._setFlagVersionCracked(false)
    },
    _setFlagVersionCracked: function (cracked) {
      return this.$http({
        method: 'post',
        url: `/version/update`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          application_name: this.application_name,
          name: this.report.version,
          cracked: cracked
        }
      })
        .then(() => {
          this.versions[this.report.version] = cracked
          this.report.cracked = cracked
          this.sending = false
          this.$forceUpdate()
        })
        .catch((err) => {
          if (err.response && err.response.status < 500) {
            this.token = null
          }

          this.sending = false
          this.$emit('error', this.token, `Cannot download report: ${err.message}`)
        })
    },
    flagBugAsFixed: function () {
      return this._setFlagBugFixed(true)
    },
    unflagBugAsFixed: function () {
      return this._setFlagBugFixed(false)
    },
    _setFlagBugFixed: function (fixed) {
      return this.$http({
        method: 'post',
        url: `/bug/update`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          name: this.application_name,
          version: this.report.version,
          title: this.report.title,
          fixed: fixed
        }
      })
        .then(() => {
          this.report.fixed = fixed
          this.sending = false
          this.$forceUpdate()
        })
        .catch((err) => {
          if (err.response && err.response.status < 500) {
            this.token = null
          }

          this.sending = false
          this.$emit('error', this.token, `Cannot download report: ${err.message}`)
        })
    },
    login: function (token) {
      this.token = token
    },
    changePage: function () {
      this.reportsBulkDelete = []
      this.emitUpdateSignal()
    },
    emitUpdateSignal: function () {
      this.sending = true

      this.$emit('updateFilters')
    },
    list: function () {
      this.sending = true

      this.$emit('list')
    },
    refreshReports: function (list, pMaxPage, pTotalItems) {
      this.sending = false
      this.reports = list
      this.totalPages = pMaxPage
      this.currentPage = Math.min(this.currentPage, pMaxPage)
      this.totalItems = pTotalItems
    },

    refreshVersions: function (list) {
      this.sending = false
      this.versions = list
      this.versionKeys = ['None'].concat(Object.keys(list))
    },

    refreshBugs: function (list) {
      this.sending = false
      this.bugs = list
    }
  }
}
