export default {
  name: 'Administration',
  props:['token'],
  emits: ['update:token'],
  data: () => ({
  }),
  mounted() {
    return this.listMember()
      .then(() => this.listInvitation())
  },
  methods: {

  }
}
