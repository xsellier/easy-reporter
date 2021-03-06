export default {
  name: 'LoginForm',
  data: () => ({
    valid: false,
    sending: false,
    username: '',
    passwordShow: false,
    password: '',
    rules: {
      username: value => !!value || 'Username is required',
      password: value => !!value || 'Password is required'
    }
  }),
  methods: {
    login: function() {
      this.sending = true

      this.$emit('login')
    },
    done: function() {
      this.sending = false
    }
  }
}
