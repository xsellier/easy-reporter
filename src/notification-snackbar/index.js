export default {
  name: 'NotificationSnackbar',
  props: ['infoMessage', 'errorObject', 'errorMessage'],
  data: () => ({
    showSnackbar: false,
    position: 'center',
    duration: 10000,
    computedMessage: null,
    color: 'pink'
  }),
  computed: {
    computedErrorMessage: function () {
      return (this.errorObject != null && this.errorMessage != null) ? `${this.errorMessage}: '${this.errorObject.message}'`: null
    }
  },
  watch: {
    computedErrorMessage: function () {
      this.computedMessage = this.computedErrorMessage
      this.color = 'pink'
      this.showSnackbar = this.computedErrorMessage != null
    },
    infoMessage: function () {
      this.computedMessage = this.infoMessage
      this.color = 'green'
      this.showSnackbar = this.infoMessage != null
    }
  }
}
