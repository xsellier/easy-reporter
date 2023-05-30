export default {
  name: 'CreateAdminForm',
  props: ['token'],
  emits: ['update:token'],
  data: () => ({
    valid: false,
    sending: false,
    projectReceived: false,
    applicationName: '',
    applicationSecret: '',
    applicationToken: '',
    secret: '',
    applicationId: 0,
    id: 0,
    email: '',
    openDialogValue: false,
    dialogForced: false,
    rules: {
      applicationName: (value) => !!value || 'Application name is required',
      applicationId: (value) => !value || /^[0-9]+$/.test(value) || 'Invalid steam id',
      applicationSecret: (value) => /^[A-Fa-f0-9]{64}$/.test(value) || 'Invalid secret, must be a 64 hexadecimal string',
      applicationToken: (value) => !!value || 'Application token is required',
      email: (value) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Invalid email address'
    }
  }),
  methods: {
    openDialog: function () {
      this.openDialogValue = true
      this.dialogForced = false
      this.projectReceived = false
    },
    forceOpenDialog: function () {
      this.openDialogValue = true
      this.dialogForced = true
      this.projectReceived = false
    },
    closeDialog: function () {
      this.openDialogValue = false
      this.dialogForced = false
      this.projectReceived = false
    },
    confirmProjectCreated: function() {
      this.$emit('projectCreated', {
        id: this.id,
        name: this.applicationName
      })

      this.projectReceived = false
      this.applicationSecret = ''
      this.applicationName = ''
      this.applicationId = 0
      this.applicationToken = ''
      this.email = ''
      this.id = 0

      this.closeDialog()
    },
    createProject: function () {
      this.sending = true

      return this.$http({
        method: 'post',
        url: `/project/create`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          name: this.applicationName,
          applicationId: this.applicationId,
          apiToken: this.applicationToken,
          secret: this.applicationSecret,
          email: this.email
        }
      })
      .then((response) => {
        this.applicationSecret = response.data.secret
        this.applicationToken = response.data.apiToken
        this.id = response.data.id
        this.projectReceived = true
        this.sending = false
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
          this.closeDialog()
        }

        this.sending = false
        this.$emit('error', 'Cannot create project', err)
      })
    }
  }
}
