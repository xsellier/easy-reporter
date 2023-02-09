<template>
  <v-app>
    <v-app-bar color="primary" v-if="token && connectionInitialized">
      <v-toolbar-title>Easy Reporter</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select class="v-tabs__div" v-model="selectedGame" :items="games" label="Games" @update:modelValue="applicationChanged()"></v-select>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <CreateAdminForm ref="createAdminForm" v-if="!connectionInitialized" v-on:createAdmin="createAdmin"></CreateAdminForm>
      <LoginForm ref="loginForm" v-if="!token && connectionInitialized" v-on:login="login"></LoginForm>
      <BugReports ref="bugReports" v-if="token && connectionInitialized" v-on:list="list" v-on:updateFilters="listReports" v-on:error="showError"></BugReports>

      <ErrorSnackbar ref="errorSnackbar"></ErrorSnackbar>
    </v-main>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; Easy reporter 2023</span>
    </v-footer>
  </v-app>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
