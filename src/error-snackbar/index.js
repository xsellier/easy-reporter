export default {
  name: 'ErrorSnackbar',
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 10000,
    message: ''
  }),
  methods: {
    show: function (message) {
      this.message = message
      this.showSnackbar = true
    }
  }
}