<template>
  <v-snackbar
    v-model="showSnackbar">
  {{ message }}
  <v-btn
    color="pink"
    flat
    @click="showSnackbar = false">
    Close
  </v-btn>
</v-snackbar>
</template>

<script>
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
</script>
