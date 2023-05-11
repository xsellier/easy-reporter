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

      this.$emit('login')
    },
    done: function () {
      this.sending = false
    }
  }
}