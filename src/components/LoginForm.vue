<template>
  <div class="md-layout">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>
      <md-card-content>
        <md-field md-clearable>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-field>

        <md-field>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="sending" @click="login">Login</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data: () => ({
    sending: false,
    password: '',
    username: ''
  }),
  methods: {
    login: function() {
      this.sending = true;

      this.$emit('login');
    },
    done: function() {
      this.sending = false
    }
  }
}
</script>
