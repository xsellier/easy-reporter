<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md4>
        <v-form class="formclass" ref="form" v-model="valid" @submit.prevent="login">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
              <v-text-field
                v-model="username"
                :rules="[rules.username]"
                label="Username"
                value=""
                required></v-text-field>
              <v-text-field 
                v-model="password"
                :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                :rules="[rules.password]"
                :type="passwordShow ? 'text' : 'password'"
                label="Password"
                required
                @click:append="passwordShow = !passwordShow"></v-text-field>
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
              @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
            </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
