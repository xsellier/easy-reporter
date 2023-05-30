export default {
  name: 'LandingPage',
  data: () => ({
    sending: false,
    loginValid: false,
    loginMenu: false,

    signInValid: false,
    signInMenu: false,
    username: null,
    passwordShow: false,
    password: null,
    invitation: null,
    rules: {
      invitation: (value) => !!value || 'Invitation key is required',
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
    signin: function () {
       this.sending = true

      return this.$http.post(`/invitation/consume`, {
        invitation: this.invitation,
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
    validateSignInForm: function () {
      if (!this.$refs.signInForm) {
        return setTimeout(() => {
          this.validateSignInForm()
        }, 50)
      }

      this.$refs.signInForm.validate()
    },
    validateLoginForm: function () {
      if (!this.$refs.loginForm) {
        return setTimeout(() => {
          this.validateLoginForm()
        }, 50)
      }

      this.$refs.loginForm.validate()
    }
  }
}
