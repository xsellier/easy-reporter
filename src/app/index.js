import ErrorSnackbar from '../error-snackbar/component.vue'
import BugReports from '../bug-report/component.vue'
import LoginForm from '../login-form/component.vue'
import CreateAdminForm from '../create-admin-form/component.vue'

export default {
  name: 'Application',
  components: {
    ErrorSnackbar,
    BugReports,
    LoginForm,
    CreateAdminForm
  },
  data () {
    return {
      active: '',
      versions: {},
      bugs: {},
      reports: [],
      reportsBulkDelete: [],
      cache: {},
      report: null,
      username: '',
      password: '',
      filename: null,
      sending: false,
      connectionInitialized: false,
      token: null,
      manual: false,
      debug: false,
      deleted: false,
      uploaded: true,
      selectedGame: null,
      games: []
    }
  },
  computed: {
    filteredReports: function () {
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
      method: 'get',
      url: '/admin/exists',
      headers: {}
    })
      .then((response) => {
        this.connectionInitialized = response.data
      })
  },
  methods: {
    showError: function (token, message) {
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
    login: function () {
      this.sending = true
      this.$http
        .post(`/user/login`, {
          username: this.$refs.loginForm.username,
          password: this.$refs.loginForm.password
        })
        .then((response) => {
          if (this.$refs.loginForm) {
            this.$refs.loginForm.done()
          }

          this.token = response.data
          this.sending = false

          return this.listApplications()
        })
        .then(() => {
          return this.listReports()
        })
        .then(() => this.listVersions())
        .then(() => this.listBugs())
        .catch((err) => {
          this.$refs.errorSnackbar.show(`Login failed: ${err.message}`)

          this.sending = false
          this.token = null

          if (this.$refs.loginForm) {
            this.$refs.loginForm.done()
          }
        })
    },
    applicationChanged: function () {
      if (!this.$refs.bugReports) {
        return Promise.resolve()
      }

      this.$refs.bugReports.application_name = this.selectedGame

      return this.list()
    },
    list: function () {
      return this.listReports()
        .then(() => this.listVersions())
        .then(() => this.listBugs())
    },
    listApplications: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/report/list-application/`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then((response) => {
          this.sending = false
          this.games = response.data

          if (this.selectedGame == null && this.games.length > 0) {
            this.selectedGame = this.games[0]
          }
        })
    },
    listReports: function () {
      if (!this.$refs.bugReports) {
        return Promise.resolve()
      }

      this.sending = true

      return this.$http({
        method: 'get',
        url: `/report/list/${this.selectedGame}/${this.$refs.bugReports.debug}/${this.$refs.bugReports.uploaded}/${this.$refs.bugReports.deleted}/${this.$refs.bugReports.fixed}/${this.$refs.bugReports.manual}/${this.$refs.bugReports.currentPage}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then((response) => {
          this.reports = response.data.list
          this.reports.sort((a, b) => {
            return a.created_at < b.created_at
          })
          this.sending = false
          this.$refs.bugReports.login(this.token)
          this.$refs.bugReports.refreshReports(this.reports, response.data.maxPage, response.data.total)
        })
        .catch((err) => {
          if (err.response && err.response.status < 500) {
            this.token = null
          }

          this.sending = false
          this.$refs.errorSnackbar.show(`Cannot list reports: ${err.message}`)
        })
    },
    listVersions: function () {
      if (!this.$refs.bugReports) {
        return Promise.resolve()
      }

      this.sending = true

      return this.$http({
        method: 'get',
        url: `/version/list/${this.selectedGame}`,
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
    listBugs: function () {
      if (!this.$refs.bugReports) {
        return Promise.resolve()
      }

      this.sending = true

      return this.$http({
        method: 'get',
        url: `/bug/list/${this.selectedGame}`,
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
