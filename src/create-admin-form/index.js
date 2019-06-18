export default {
  name: 'CreateAdminForm',
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
    createAdmin: function() {
      this.sending = true

      this.$emit('createAdmin')
    },
    done: function() {
      this.sending = false
    }
  }
}
