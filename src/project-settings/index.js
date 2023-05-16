export default {
  name: 'ProjectSettings',
  props:['token', 'application_data'],
  emits: ['update:token'],
  data: () => ({
    application_name: '',
    application_id: 0,
    project_id: 0,
    email: '',
    secret: '',

    sending: false,
    member: [],
    rules: {
      applicationName: (value) => !!value || 'Application name is required',
      applicationId: (value) => !value || /^[0-9]+$/.test(value) || 'Invalid steam id',
      applicationSecret: (value) => /^[A-Fa-f0-9]{64}$/.test(value) || 'Invalid secret, must be a 64 hexadecimal string',
      email: (value) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Invalid email address'
    }
  }),
  watch: {
    application_data(value) {
      this.application_name = value.name
      this.application_id = value.steam_id
      this.project_id = value.id
      this.email = value.email

      return this.listMember()
    }
  },
  mounted() {
    this.application_name = this.application_data.name
    this.application_id = this.application_data.steam_id
    this.project_id = this.application_data.id
    this.email = this.application_data.email

    return this.listMember()
  },
  methods: {
    removeUserFromProject: function (user_id) {
      console.log('NOT YET IMPLEMENTED')
    },
    listMember: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/project/${this.project_id}/list-member`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        this.member = response.data
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list project members', err)
      })
    },
    emitUpdate: function () {
      this.$emit('updateApplicationData', {
        name: this.application_name,
        steam_id: this.application_id,
        id: this.project_id,
        email: this.email
      })
    },
    updateApplicationName: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/project/name`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          name: this.application_name,
          projectId: this.project_id
        }
      })
      .then((response) => {
        this.sending = false
        this.emitUpdate()
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update project name', err)
      })
    },
    updateApplicationId: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/project/steamId`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          applicationId: this.application_id,
          projectId: this.project_id
        }
      })
      .then((response) => {
        this.sending = false
        this.emitUpdate()
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update application id', err)
      })
    },
    updateEmail: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/project/email`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          email: this.email,
          projectId: this.project_id
        }
      })
      .then((response) => {
        this.sending = false
        this.emitUpdate()
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update email', err)
      })
    },
    updateSecret: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/project/secret`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          secret: this.secret,
          projectId: this.project_id
        }
      })
      .then((response) => {
        this.sending = false

        // No need to update, since the secret ain't used by the front-end, and shouldn't be saved anywhere
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update secret', err)
      })
    },
    archiveProject: function () {
      console.log('NOT YET IMPLEMENTED')
    }
  }
}
