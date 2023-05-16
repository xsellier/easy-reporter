export default {
  name: 'ErrorSnackbar',
  props: ['error', 'message'],
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 10000
  }),
  computed: {
    errorMessage: function () {
      return (this.error != null && this.message != null) ? `${this.message}: '${this.error.message}'`: null
    }
  },
  watch: {
    errorMessage: function () {
      this.showSnackbar = this.errorMessage != null
    }
  }
}
