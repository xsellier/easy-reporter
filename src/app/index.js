import ErrorSnackbar from '../error-snackbar/component.vue'
import ReportList from '../report-list/component.vue'
import LandingPage from '../landing-page/component.vue'
import ProjectSettings from '../project-settings/component.vue'
import SteamAnalytics from '../steam-analytics/component.vue'
import BugList from '../bug-list/component.vue'

import CreateAdminForm from '../create-admin-form/component.vue'
import CreateProjectForm from '../create-project-form/component.vue'

export default {
  name: 'Application',
  components: {
    ErrorSnackbar,
    ReportList,
    CreateAdminForm,
    CreateProjectForm,
    LandingPage,
    ProjectSettings,
    SteamAnalytics,
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
      selectedApplication: null,
      applications: [],

      showButton: false,
      errorMesage: null,
      errorObject: null
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
    adminCreated: function (token) {
      this.token = token
      this.setupAdminWizard = true
    },
    loggedIn: function(token) {
      this.token = token

      return this.listApplications()
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
        this.token = null
        this.selectedApplication = null
        this.games = []
      })
    },
    openProjectDialog: function () {
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
          this.$refs.createProjectForm.forceOpenDialog()
          this.setupProjectWizard = false
          this.applications = []
        }
        
        if (this.selectedApplication == null && this.applications.length > 0) {
          this.selectedApplication = this.applications[0]
        }

        return Promise.resolve()
      })
    },
    updateApplicationData: function (applicationData) {
      this.selectedApplication.name = applicationData.name
      this.selectedApplication.steam_id = applicationData.steam_id
      this.selectedApplication.id = applicationData.id
      this.selectedApplication.email = applicationData.email
    }
  }
}
