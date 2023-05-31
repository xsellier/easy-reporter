export default {
  name: 'Administration',
  props:['token'],
  emits: ['update:token'],
  data: () => ({
    sending: false,
    user: [],
    invitation: [],

    selectedUserId: null,
    showConsumed: false,

    totalPages: 1,
    currentPage: 1,
    totalItems: 0,

    application_name: '',
    application_id: 0,
    archived: false,
    email: '',
    secret: '',
    apiToken: '',
    id: 0,

    projectValid: false,
    projectTotalPages: 1,
    projectCurrentPage: 1,
    projectTotalItems: 0,

    invitationTotalPages: 1,
    invitationCurrentPage: 1,
    invitationTotalItems: 0,

    rules: {
      applicationName: (value) => !!value || 'Application name is required',
      applicationToken: (value) => !!value || 'Application token is required',
      applicationId: (value) => !value || /^[0-9]+$/.test(value) || 'Invalid steam id',
      applicationSecret: (value) => /^[A-Fa-f0-9]{64}$/.test(value) || 'Invalid secret, must be a 64 hexadecimal string',
      email: (value) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Invalid email address'
    }
  }),
  watch: {
    showConsumed: function () {
      return this.listInvitation()
    }
  },
  mounted() {
    return this.listUser()
      .then(() => this.listInvitation())
  },
  methods: {
    changePage: function () {
      return this.listUser()
    },
    changeProjectPage: function () {
      return this.listUserProject(this.selectedUserId)
    },
    changeInvitationPage: function () {
      return this.listInvitation()
    },
    copyToClipboard: function (name) {
      navigator.clipboard.writeText(name)

      this.$emit('info', `Copied to clipboard: '${name}'`)
    },
    computeIconFromUserType: function (userType) {
      if (userType == 0) {
        return 'mdi-security'
      }

      if (userType == 1) {
        return 'mdi-account-star'
      }

      return 'mdi-account'
    },
    computeColorFromUserBan: function (banned) {
      return banned ?  'green-accent-1' : 'deep-orange-accent-1'
    },
    computeIconFromUserBan: function (banned) {
      return banned ? 'mdi-check-circle' : 'mdi-cancel'
    },
    computeInvitationIcon: function (invite_id) {
      return invite_id == null ? 'mdi-account-clock-outline' : 'mdi-account-check-outline'
    },
    removeUser: function (userData) {
      this.sending = true

      return this.$http({
        method: 'delete',
        url: `/user/${encodeURIComponent(userData.id)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false

        this.user = this.user.filter((item) => item.id != userData.id)

        this.selectedUserId = null
        this.application_name = ''
        this.application_id = 0
        this.id = 0
        this.email = ''
        this.secret = ''
        this.apiToken = ''
        this.archived = false
        this.projectValid = false

        this.projectTotalPages = 0
        this.projectCurrentPage = 0
        this.projectTotalItems = 0
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.showError('Cannot list projects', err)
      })
    },

    isUserAdmin: function (userData) {
      return userData.type == 0
    },

    listUserProject: function (user_id) {
      this.sending = true
      this.selectedUserId = user_id

      return this.$http({
        method: 'get',
        url: `/user/${encodeURIComponent(user_id)}/project/list/${this.projectCurrentPage}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false

        this.application_name = ''
        this.application_id = 0
        this.id = 0
        this.email = ''
        this.secret = ''
        this.apiToken = ''
        this.archived = false
        this.projectValid = false

        if (response.data.list.length) {
          this.application_name = response.data.list[0].name
          this.application_id = response.data.list[0].steam_id
          this.email = response.data.list[0].email
          this.id = response.data.list[0].id
          this.archived = response.data.list[0].archived
          this.projectValid = true
        }

        this.projectTotalPages = response.data.maxPage
        this.projectCurrentPage = Math.min(this.projectCurrentPage, response.data.maxPage)
        this.projectTotalItems = response.data.total
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.showError('Cannot list projects', err)
      })
    },
    listUser: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/user/list/${encodeURIComponent(this.currentPage)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        this.user = response.data.list
        this.totalPages = response.data.maxPage
        this.currentPage = Math.min(this.currentPage, response.data.maxPage)
        this.totalItems = response.data.total
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list users', err)
      })
    },

    listInvitation: function () {
      this.sending = true

      return this.$http({
        method: 'PUT',
        url: `/invitation/list/manager/${this.invitationCurrentPage}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          consumed: this.showConsumed
        }
      })
      .then((response) => {
        this.sending = false
        this.invitation = response.data.list
        this.invitationTotalPages = response.data.maxPage
        this.invitationCurrentPage = Math.min(this.invitationCurrentPage, response.data.maxPage)
        this.invitationTotalItems = response.data.total
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list invitations', err)
      })
    },

    setUserBan: function (userData) {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/user/ban`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          id: userData.id,
          banned: !userData.banned
        }
      })
      .then((response) => {
        this.sending = false

        userData.banned = !userData.banned
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update user banishement', err)
      })
    },

    cancelInvitation: function(name) {
      this.sending = true

      return this.$http({
        method: 'delete',
        url: `/invitation/cancel/${encodeURIComponent(name)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
        }
      })
      .then((response) => {
        this.sending = false
        this.invitation = this.invitation.filter((item) => item.name != name)
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot invite member', err)
      })
    },
    createInvitation: function () {
      this.sending = true

      return this.$http({
        method: 'post',
        url: `/invitation/invite/manager`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
        }
      })
      .then((response) => {
        this.sending = false
        this.invitation = this.invitation.concat([{
          name: response.data,
          type: 1,
          created_at: new Date().toISOString(),
        }])
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot invite member', err)
      })
    },
    archiveProject: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/user/project/archive`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          archive: !this.archived,
          projectId: this.id
        }
      })
      .then((response) => {
        this.sending = false
        this.archived = !this.archived
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot archive project', err)
      })
    }
  }
}
