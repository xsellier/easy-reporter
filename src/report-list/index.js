export default {
  name: 'ReportList',
  props: ['application_data', 'token', 'version_list', 'report_data'],
  emits: ['update:token'],
  data: () => ({
    versionSelected: 'None',

    platformKeys: [],
    platformSelected: 'None',

    reports: [],
    version: [],
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
    cracked: 2,

    totalPages: 1,
    currentPage: 1,
    totalItems: 0,

    selectedReport: null,
    computedMaxRow: 1
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
    report_data(reportInfomations) {
      return this.info(reportInfomations)
    },
    application_data() {
      return this.list()
    },
    version_list(versionList) {

      this.versionSelected = versionList[0]
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize)
  },
  mounted() {
    window.addEventListener("resize", this.handleResize)
    this.versionSelected = this.version_list[0]

    return this.list()
      .then(() => this.info(this.report_data))
      .then(() => this.handleResize())
  },
  methods: {
    handleResize: function () {
      if (this.$refs.reportDetails == null) {
        return setTimeout(this.handleResize, 10)
      }

      const windowHeight = window.innerHeight || document.documentElement.scrollHeight || document.body.scrollHeight || 0
      const reportDetailsRectangle = this.$refs.reportDetails.getBoundingClientRect()
      const remainingHeight = windowHeight - (reportDetailsRectangle.top + 64)

      this.computedMaxRow = Math.max(Math.floor(remainingHeight / 19.5), 7)
    },
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
          reports: this.reportsBulkDelete.map((item) => item.filename)
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

      if (report == null || report.deleted_at != null || !report.uploaded) {
        return
      }

      this.sending = true

      this.$http({
        method: 'get',
        url: `/report/${encodeURIComponent(report.filename)}/${encodeURIComponent(this.application_data.name)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        let rawReport = pako.ungzip(atob(response.data.data), { to: 'string' })

        this.filename = response.data.filename
        this.report = JSON.parse(rawReport)
        this.report.version = response.data.version
        this.report.title = response.data.title
        this.report.fixed = response.data.fixed
        this.report.cracked = response.data.cracked
        this.report.legit = response.data.legit
        this.sending = false

        // Change the value of the read value
        this.reports.filter((itemReport) => itemReport.filename == response.data.filename).forEach((itemReport) => itemReport.read = '1')

        this.selectedReport = response.data.filename
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot download report', err)
      })
    },

    setFlagReportCracked: function (cracked) {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/report/update`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          filename: this.filename,
          cracked: cracked
        }
      })
      .then(() => {
        this.report.cracked = cracked
        this.sending = false
        this.$forceUpdate()
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update report cracked status', err)
      })
    },
    setFlagBugFixed: function (fixed) {
      this.sending = true

      return this.$http({
        method: 'post',
        url: `/bug/fixed`,
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
        this.$emit('error', 'Cannot update report fixed status', err)
      })
    },
    changePage: function () {
      return this.listReports()
    },
    list: function () {
      return this.listReports()
        .then(() => this.listPlatforms())
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
          cracked: this.getCheckboxValue('cracked'),
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
 
    listPlatforms: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/report/list-platform/${encodeURIComponent(this.application_data.name)}`,
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
   
    getSelectedPlatform: function() {
      return this.platformSelected != 'None' ? this.platformSelected : undefined
    },

    getSelectedVersion: function() {
      return this.versionSelected != 'None' ? this.versionSelected : undefined
    }
  }
}
