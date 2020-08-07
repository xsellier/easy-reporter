import ErrorSnackbar from "../error-snackbar/component.vue"
import BugCharts from "../bug-chart/component.vue"
import BugReports from "../bug-report/component.vue"
import LoginForm from "../login-form/component.vue"
import CreateAdminForm from "../create-admin-form/component.vue"
import VueApexCharts from "vue-apexcharts"

export default {
  name: "Application",
  components: {
    ErrorSnackbar,
    BugCharts,
    BugReports,
    LoginForm,
    VueApexCharts,
    CreateAdminForm
  },
  data() {
    return {
      active: "",
      versions: {},
      bugs: {},
      reports: [],
      reportsBulkDelete: [],
      cache: {},
      report: null,
      username: "",
      password: "",
      filename: null,
      sending: false,
      connectionInitialized: false,
      token: null,
      debug: false,
      deleted: false,
      uploaded: true,
    }
  },
  computed: {
    filteredReports: function() {
      let self = this

      return this.reports.filter((report) => {
        return (
          report.uploaded == self.uploaded &&
          (report.deleted_at != null) == self.deleted &&
          report.debug == self.debug
        )
      })
    }
  },
  beforeMount: function () {
    this.sending = true

    return this.$http({
      method: "get",
      url: "/admin/exists",
      headers: {}
    })
    .then((response) => {
      this.connectionInitialized = response.data
    })
  },
  methods: {
    showError: function(token, message) {
      this.token = token

      this.$refs.errorSnackbar.show(message)
    },
    createAdmin: function () {
      this.sending = true

      this.$http
        .post(`/admin/create`, {
          username: this.$refs.createAdminForm.username,
          password: this.$refs.createAdminForm.password
        })
        .then((response) => {
          this.token = response.data
          this.sending = false

          this.connectionInitialized = true
          this.$refs.createAdminForm.done()

          return this.listReports()
        })
        .then(() => this.listVersions())
        .then(() => this.listBugs())
        .catch((err) => {
          this.sending = false
          this.$refs.createAdminForm.done()
          this.token = null

          this.$refs.errorSnackbar.show(`Login failed: ${err.message}`)
        })
    },
    login: function() {
      this.sending = true

      this.$http
        .post(`/user/login`, {
          username: this.$refs.loginForm.username,
          password: this.$refs.loginForm.password
        })
        .then((response) => {
          this.token = response.data
          this.sending = false

          this.$refs.loginForm.done()

          return this.listReports()
        })
        .then(() => this.listVersions())
        .then(() => this.listBugs())
        .catch((err) => {
          this.sending = false
          this.$refs.loginForm.done()
          this.token = null

          this.$refs.errorSnackbar.show(`Login failed: ${err.message}`)
        })
    },
    list: function() {
      return this.listReports()
        .then(() => this.listVersions())
        .then(() => this.listBugs())
    },
    listReports: function() {
      this.sending = true

      return this.$http({
        method: "get",
        url: "/report/list",
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.reports = response.data
        this.reports.sort((a, b) => {
          return a.created_at < b.created_at
        })
        this.sending = false

        this.$refs.bugReports.login(this.token)
        this.$refs.bugCharts.refreshReports(this.reports)
        this.$refs.bugReports.refreshReports(this.reports)
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.$refs.errorSnackbar.show(`Cannot list reports: ${err.message}`)
      })
    },
    listVersions: function() {
      this.sending = true

      return this.$http({
        method: "get",
        url: "/version/list",
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

        this.$refs.bugCharts.refreshVersions(this.versions)
        this.$refs.bugReports.refreshVersions(this.versions)
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.$refs.errorSnackbar.show(`Cannot list versions: ${err.message}`)
      })
    },
    listBugs: function() {
      this.sending = true

      return this.$http({
        method: "get",
        url: "/bug/list",
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

        this.$refs.bugReports.refreshBugs(this.bugs)
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.$refs.errorSnackbar.show(`Cannot list bugs: ${err.message}`)
      })
    }
  }
}
