<template>
  <v-app>
    <CreateAdminForm ref="createAdminForm" v-if="!connectionInitialized" v-on:createAdmin="createAdmin"></CreateAdminForm>
    <LoginForm ref="loginForm" v-if="!token && connectionInitialized" v-on:login="login"></LoginForm>

    <template v-if="token && connectionInitialized">
      <v-tabs
        v-model="active"
        color="indigo"
        dark
        absolute
        clipped-left
        centered
        fixed-tabs
        slider-color="white"
        app
      >
        <v-tab ripple>Charts</v-tab>
        <v-tab-item>
          <BugCharts ref="bugCharts" v-on:error="showError"></BugCharts>
        </v-tab-item>
        <v-tab ripple>Bug reports</v-tab>
        <v-tab-item>
         <BugReports ref="bugReports" v-on:list="list" v-on:updateFilters="listReports" v-on:error="showError"></BugReports>
        </v-tab-item>

        <v-select xs12 class="v-tabs__div" v-model="selectedGame" :items="games" label="Games" v-on:change="applicationChanged()"></v-select>
      </v-tabs>
    </template>

    <ErrorSnackbar ref="errorSnackbar"></ErrorSnackbar>
  </v-app>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
