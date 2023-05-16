export default {
  name: 'BugList',
  props: ['application_data', 'token'],
  data: () => ({
    sending: false
  }),
  watch: {
    application_data() {
      return this.list()
    }
  },
  methods: {

    list: function () {
      
    }
  }
}
