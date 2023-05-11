<template>
  <v-app>
    <!-- Wizard form //-->
    <v-app-bar color="indigo" v-if="!setupWizard">
      <v-divider class="border-opacity-0" color="info" vertical thickness="32"></v-divider>
      <v-toolbar-side-icon>
        <v-img class="mr-3" aspect-ratio="1/1" src="/images/logo.png" height="32px" width="32px"></v-img>
      </v-toolbar-side-icon>
      <v-toolbar-title>Indie Maker Tool</v-toolbar-title>
    </v-app-bar>

    <!-- Wizard done - not logged in //-->    
    <LandingPage ref="loginForm" v-if="!token && setupWizard" v-on:login="login"></LandingPage>

    <!-- User logged in //-->
    <v-app-bar color="indigo" v-if="token && setupWizard">
      <v-toolbar-title>Indie Maker Tool</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select class="v-tabs__div" v-model="selectedGame" :items="games" label="Games" @update:modelValue="applicationChanged()"></v-select>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-app-bar color="white" v-if="token && setupWizard">
      <v-spacer></v-spacer>
      <v-tabs v-model="tabView" v-if="token && setupWizard">
        <v-tab value="dashboard">Dashboard</v-tab>
        <v-tab value="buglist" @click="openBugList">Bug list</v-tab>
        <v-tab value="steamanalytics">Analytics Steam</v-tab>
        <v-tab value="settings">Settings</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <CreateAdminForm ref="createAdminForm" v-if="!setupWizard" v-on:createAdmin="createAdmin"></CreateAdminForm>
      <v-window v-model="tabView" v-if="token && setupWizard">
        <v-window-item value="dashboard"></v-window-item>
        <v-window-item value="steamanalytics"></v-window-item>
        <v-window-item value="settings"></v-window-item>
        <v-window-item value="buglist">
          <BugReports ref="bugReports" v-on:list="list" v-on:updateFilters="listReports" v-on:error="showError"></BugReports>
        </v-window-item>
      </v-window>
      <ErrorSnackbar ref="errorSnackbar"></ErrorSnackbar>
    </v-main>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; Binogure Studio 2023</span>
    </v-footer>
  </v-app>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
