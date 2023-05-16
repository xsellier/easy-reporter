export default {
  name: 'CreateAdminForm',
  data: () => ({
    valid: false,
    sending: false,
    username: '',
    passwordShow: false,
    password: '',
    rules: {
      username: (value) => !!value || 'Username is required',
      password: (value) => !!value || 'Password is required'
    }
  }),
  methods: {
    createAdmin: function () {
      this.sending = true

      return this.$http.post(`/admin/create`, {
        username: this.username,
        password: this.password
      })
      .then((response) => {
        this.sending = false

        return this.$emit('adminCreated', response.data)
      })
      .catch((err) => {
        this.sending = false
        this.$emit('error', 'Cannot create admin', err)
      })
    }
  }
}
