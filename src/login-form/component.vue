<template>
  <v-divider></v-divider>
  <v-form class="formclass" ref="form" v-model="valid" @submit.prevent="login">
    <v-card max-width="512" class="mx-auto">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login form</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          v-model="username"
          :rules="[rules.username]"
          label="Username"
          clearable
          required>
          
        </v-text-field>
        <v-text-field 
          v-model="password"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.password]"
          :type="passwordShow ? 'text' : 'password'"
          label="Password"
          clearable
          required
          @click:append="passwordShow = !passwordShow">
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="sending || !valid"
          depressed
          small
          value=""
          type="submit"
          color="primary"
          @click="login">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
