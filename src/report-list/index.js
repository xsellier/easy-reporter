export default {
  name: 'ReportList',
  props: ['application_data', 'token'],
  emits: ['update:token'],
  data: () => ({
    versions: {},
    versionKeys: [],
    versionSelected: 'None',

    platformKeys: [],
    platformSelected: 'None',

    reports: [],
    version: [],
    bugs: {},
    reportsBulkDelete: [],
    cache: {},
    report: null,
    username: '',
    password: '',
    filename: null,
    sending: false,

    // Query filters
    manual: false,
    debug: false,
    deleted: 2,
    uploaded: 1,
    fixed: 2,
    cracked: 0,

    totalPages: 1,
    currentPage: 1,
    totalItems: 0,

    selectedReport: null
  }),
  computed: {
    filteredReports: function () {
      return this.reports
    },

    selectAllValue: {
      get: function() {
        return this.reportsBulkDelete.length >= this.filteredReports.length && this.filteredReports.length > 0
      },

      set: function(value) {
        // noop
      }
    },

    uploadedValue: {
      get: function() {
        return this.isCheckboxChecked('uploaded')
      },
      set: function(value) {
        // noop
      }
    },
    crackedValue: {
      get: function() {
        return this.isCheckboxChecked('cracked')
      },
      set: function(value) {
        // noop
      }
    },
    fixedValue: {
      get: function() {
        return this.isCheckboxChecked('fixed')
      },
      set: function(value) {
        // noop
      }
    }
  },
  watch: {
    application_data() {
      return this.list()
    }
  },
  mounted() {
    return this.list()
  },
  methods: {
    getPlatformIcon: function (platformName) {
      if (platformName == 'windows') {
        return 'mdi-microsoft-windows'
      }

      if (platformName == 'x11') {
        return 'mdi-debian'
      }

      return 'mdi-apple'
    },
    checkboxChange(modelName) {
      this[modelName] = (this[modelName] + 1) % 3
    },
    isCheckboxChecked(modelName) {
      return this[modelName] == 1
    },
    isCheckboxIndeterminate(modelName) {
      return this[modelName] == 0
    },
    getCheckboxValue(modelName) {
      if (this.isCheckboxChecked(modelName)) {
        return true
      }

      if (this.isCheckboxIndeterminate(modelName)) {
        return undefined
      }

      return false
    },

    isSelected: function (reportName) {
      return reportName == this.selectedReport
    },
    selectAll: function () {
      if (this.reportsBulkDelete.length < this.filteredReports.length) {
        this.reportsBulkDelete = [].concat(this.filteredReports)
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
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot delete reports', err)
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
    copyclipboard: function () {
      navigator.clipboard.writeText(JSON.stringify(this.report.savegame))
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
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot delete report', err)
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

        // Change the value of the read value
        this.reports.filter((itemReport) => itemReport.filename == report.filename).forEach((itemReport) => itemReport.read = '1')

        this.selectedReport = report.filename
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot download report', err)
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
          application_name: this.application_data.name,
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
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot download report', err)
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
          name: this.application_data.name,
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
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot download report', err)
      })
    },
    changePage: function () {
      this.emitUpdateSignal()
    },
    emitUpdateSignal: function () {
      this.reportsBulkDelete = []
      this.sending = true

      return this.listReports()
    },
    list: function () {
      this.sending = true

      return this.listReports()
        .then(() => this.listVersions())
        .then(() => this.listPlatforms())
        .then(() => this.listBugs())
    },
    listReports: function () {
      this.sending = true

      return this.$http({
        method: 'post',
        url: `/report/list/${this.application_data.name}/${this.currentPage}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          debug: this.debug,
          uploaded: this.getCheckboxValue('uploaded'),
          deleted: this.getCheckboxValue('deleted'),
          fixed: this.getCheckboxValue('fixed'),
          manual: this.manual,
          platform: this.getSelectedPlatform(),
          version: this.getSelectedVersion()
        }
      })
      .then((response) => {
        response.data.list.sort((a, b) => {
          return a.created_at < b.created_at
        })

        this.sending = false
        this.reports = response.data.list
        this.reportsBulkDelete = []
        this.totalPages = response.data.maxPage
        this.currentPage = Math.min(this.currentPage, response.data.maxPage)
        this.totalItems = response.data.total
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list reports', err)
      })
    },
    listVersions: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/version/list/${this.application_data.name}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.versions = response.data.reduce((acc, item) => {
          acc[item.name] = item.cracked

          return acc
        }, {})
        this.sending = false
        this.versionKeys = ['None'].concat(Object.keys(this.versions))
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list versions', err)
      })
    },
    listPlatforms: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/report/list-platform/`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        this.platformKeys = ['None'].concat(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.platformKeys = ['None']
        this.sending = false
        this.$emit('error', 'Cannot list platforms', err)
      })
    },
    listBugs: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/bug/list/${this.application_data.name}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.bugs = response.data.reduce((acc, item) => {
          if (acc[item.version] == null) {
            acc[item.version] = {}
          }

          acc[item.version][item.title] = item.fixed

          return acc
        }, {})
        this.sending = false
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list bugs', err)
      })
    },
   
    getSelectedPlatform: function() {
      return this.platformSelected != 'None' ? this.platformSelected : undefined
    },

    getSelectedVersion: function() {
      return this.versionSelected != 'None' ? this.versionSelected : undefined
    }
  }
}
