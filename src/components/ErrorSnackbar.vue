<template>
  <md-snackbar :md-position="position" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
    <span>{{ message }}</span>
    <md-button class="md-primary" @click="showSnackbar = false">Hide</md-button>
  </md-snackbar>
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
