import NotificationSnackbar from '../notification-snackbar/component.vue'
import ReportList from '../report-list/component.vue'
import LandingPage from '../landing-page/component.vue'
import ProjectSettings from '../project-settings/component.vue'
import SteamAnalytics from '../steam-analytics/component.vue'
import BugList from '../bug-list/component.vue'
import Administration from '../administration/component.vue'

import CreateAdminForm from '../create-admin-form/component.vue'
import CreateProjectForm from '../create-project-form/component.vue'
import JoinProjectForm from '../join-project-form/component.vue'

import { ref } from 'vue'

export default {
  name: 'Application',
  components: {
    Administration,
    NotificationSnackbar,
    ReportList,
    CreateAdminForm,
    CreateProjectForm,
    LandingPage,
    ProjectSettings,
    SteamAnalytics,
    JoinProjectForm,
    BugList
  },
  data () {
    return {
      tabView: 'dashboard',
      active: '',
      username: '',
      password: '',
      sending: false,

      setupAdminWizard: false,
      setupProjectWizard: false,

      token: null,
      userType: 0,
      selectedApplication: null,
      applications: [],
      versionList: [],

      showButton: false,
      errorMesage: null,
      errorObject: null,

      infoMessage: null,

      reportData: null
    }
  },
  watch: {
    selectedApplication() {
      return this.listVersions()
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  beforeMount: function () {
    this.sending = true

    return this.$http({
      method: 'get',
      url: '/admin/exists',
      headers: {}
    }).then((response) => {
      this.setupAdminWizard = response.data
    })
  },
  methods: {
     handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      this.showButton = scrollTop > 150
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    showError: function (message, error) {
      this.errorMesage = message
      this.errorObject = error
    },
    showInfo: function (message) {
      this.infoMessage = message
    },
    adminCreated: function (token) {
      this.token = ref(token)
      this.setupAdminWizard = true
    },
    loggedIn: function(token) {
      this.token = ref(token)

      return this.getUserType()
        .then(() => this.listApplications())
    },
    addProjectToList: function () {

    },
    inviteManager: function () {

    },
    getUserType: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/user/type`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        this.userType = response.data
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.showError('Cannot get user type', err)
      })
    },
    deleteUser: function () {
      this.sending = true

      return this.$http({
        method: 'delete',
        url: `/user`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        this.token = ref(null)
        this.selectedApplication = null
        this.games = []

        this.showInfo('User has been deleted')
      })
    },
    isSteamIdValid: function () {
      return this.selectedApplication != null && parseInt(this.selectedApplication.steam_id) > 0
    },
    projectCreated: function(id, name) {
      return this.listApplications()
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
        this.token = ref(null)
        this.selectedApplication = null
        this.games = []

        this.showInfo('Logged out')
      })
    },
    openJoinProjectDialog: function () {
      this.$refs.joinProjectForm.openDialog()
    },
    openCreateProjectDialog: function () {
      this.$refs.createProjectForm.openDialog()
    },
    listApplications: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/project/list`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        if (response.data.length > 0) {
          this.setupProjectWizard = true
          this.applications = response.data

        } else {
          this.applications = []

          if (this.userType < 2) {
            this.$refs.createProjectForm.forceOpenDialog()
            this.setupProjectWizard = false
          } else {
            this.$refs.joinProjectForm.forceOpenDialog()
            this.setupProjectWizard = false
          }
        }

        if (this.selectedApplication == null && this.applications.length > 0) {
          this.selectedApplication = this.applications[0]
        }
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.showError('Cannot list projects', err)
      })
    },
    listVersions: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/report/list-version/${encodeURIComponent(this.selectedApplication.name)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        this.versionList = ['None'].concat(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.showError('Cannot list versions', err)
      })
    },
    updateApplicationData: function (applicationData) {
      this.selectedApplication.name = applicationData.name
      this.selectedApplication.steam_id = applicationData.steam_id
      this.selectedApplication.id = applicationData.id
      this.selectedApplication.email = applicationData.email
    },
    openReportView: function (reportToView) {
      this.tabView = 'reportList'
      this.reportData = reportToView
    }
  }
}
