export default {
  name: 'JoinProjectForm',
  props: ['token'],
  emits: ['update:token'],
  data: () => ({
    valid: false,
    sending: false,
    projectReceived: false,
    invitation: '',
    applicationName: '',
    applicationId: 0,
    id: 0,
    email: '',
    openDialogValue: false,
    dialogForced: false,
    rules: {
      invitation: (value) => !!value || 'Invitation key is required'
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
    confirmProjectJoined: function() {
      this.$emit('projectJoined', {
        id: this.id,
        name: this.applicationName
      })

      this.projectReceived = false
      this.invitation = ''
      this.applicationName = ''
      this.applicationId = 0
      this.email = ''
      this.id = 0

      this.closeDialog()
    },
    joinProject: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/invitation/consume`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          invitation: this.invitation
        }
      })
      .then((response) => {
        this.applicationName = response.data.name
        this.applicationId = response.data.steam_id
        this.id = response.data.id
        this.email = response.data.email
        this.projectReceived = true
        this.sending = false
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
          this.closeDialog()
        }

        this.sending = false
        this.$emit('error', 'Cannot join project', err)
      })
    }
  }
}
