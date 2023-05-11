import ErrorSnackbar from '../error-snackbar/component.vue'
import BugReports from '../bug-report/component.vue'
import LoginForm from '../login-form/component.vue'
import CreateAdminForm from '../create-admin-form/component.vue'
import LandingPage from '../landing-page/component.vue'

export default {
  name: 'Application',
  components: {
    ErrorSnackbar,
    BugReports,
    LoginForm,
    CreateAdminForm,
    LandingPage
  },
  data () {
    return {
      tabView: 'dashboard',
      active: '',
      versions: {},
      platforms: [],
      bugs: {},
      reports: [],
      cache: {},
      report: null,
      username: '',
      password: '',
      filename: null,
      sending: false,
      setupWizard: false,
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
        this.setupWizard = response.data
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

          this.setupWizard = true
          this.$refs.createAdminForm.done()

          return this.listApplications()
        })
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
        .catch((err) => {
          this.$refs.errorSnackbar.show(`Login failed: ${err.message}`)

          this.sending = false
          this.token = null

          if (this.$refs.loginForm) {
            this.$refs.loginForm.done()
          }
        })
    },
    logout: function () {
      this.sending = true

      return this.$http({
        method: 'delete',
        url: `/user/logout`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        this.token = null
      })
    },
    openBugList: function () {
      if (!this.$refs.bugReports) {
        return Promise.resolve()
      }

      this.$refs.bugReports.initialize(this.token, this.selectedGame)
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

        // Update the game
        if (this.$refs.bugReports) {
          this.$refs.bugReports.application_name = this.selectedGame
        }

        return Promise.resolve()
      })
    }
  }
}
