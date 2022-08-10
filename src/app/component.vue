<template>
  <v-app>
    <CreateAdminForm ref="createAdminForm" v-if="!connectionInitialized" v-on:createAdmin="createAdmin"></CreateAdminForm>
    <LoginForm ref="loginForm" v-if="!token && connectionInitialized" v-on:login="login"></LoginForm>

    <template v-if="token && connectionInitialized">
      <v-layout text-xs-center>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-select xs12 class="v-tabs__div" v-model="selectedGame" :items="games" label="Games" v-on:change="applicationChanged()"></v-select>
            <v-divider></v-divider>

<!--             <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-card class="blue">
                    <v-card-text class="px-0">6</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs6>
                  <v-card class="blue">
                    <v-card-text class="px-0">6</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs6>
                  <v-card class="blue">
                    <v-card-text class="px-0">6</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs6>
                  <v-card class="blue">
                    <v-card-text class="px-0">6</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
 -->
          </v-card>
        </v-flex>
      </v-layout>
      <BugReports ref="bugReports" v-on:list="list" v-on:updateFilters="listReports" v-on:error="showError"></BugReports>
    </template>

    <ErrorSnackbar ref="errorSnackbar"></ErrorSnackbar>
  </v-app>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
