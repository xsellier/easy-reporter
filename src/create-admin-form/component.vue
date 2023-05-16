<template>
  <v-divider></v-divider>
  <v-card max-width="512" class="mx-auto">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Create admin form</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="username" :rules="[rules.username]" label="Username" clearable required></v-text-field>
        <v-text-field v-model="password" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" 
          :rules="[rules.password]" :type="passwordShow ? 'text' : 'password'"
          label="Password" required @click:append="passwordShow = !passwordShow"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="sending || !valid" depressed small value="" color="primary" @click="createAdmin">
        Create admin
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
