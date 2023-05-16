export default {
  name: 'LandingPage',
  data: () => ({
    valid: false,
    sending: false,
    loginMenu: false,
    username: null,
    passwordShow: false,
    password: null,
    rules: {
      username: (value) => !!value || 'Username is required',
      password: (value) => !!value || 'Password is required'
    }
  }),
  methods: {
    login: function () {
       this.sending = true

      return this.$http.post(`/user/login`, {
        username: this.username,
        password: this.password
      })
      .then((response) => {
        this.sending = false

        return this.$emit('loggedIn', response.data)
      })
      .catch((err) => {
        this.sending = false
        this.$emit('error', 'Login failed', err)
      })
    },
    validateForm: function () {
      if (!this.$refs.form) {
        return setTimeout(() => {
          this.validateForm()
        }, 50)
      }

      this.$refs.form.validate()
    }
  }
}
