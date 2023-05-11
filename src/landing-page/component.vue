<template>
  <div id="main-container">
    <v-divider class="border-opacity-0" color="info" thickness="16"></v-divider>
    <v-toolbar color="transparent" flat=true>
      <v-divider class="border-opacity-0" color="info" vertical thickness="32"></v-divider>
      <v-toolbar-side-icon>
        <v-img class="mr-3" aspect-ratio="1/1" src="/images/logo.png" height="32px" width="32px"></v-img>
      </v-toolbar-side-icon>
      <v-toolbar-title>Made by Binogure Studio</v-toolbar-title>
      
      
      <v-menu :close-on-content-click="false" v-model="loginMenu">
        <template v-slot:activator="{ props }">
          <v-btn variant="outlined" rounded v-bind="props" color="#fefefe">
            Login
          </v-btn>
        </template>
        <v-form class="formclass" ref="form" v-model="valid" @submit.prevent="login">
            <v-card max-width="512" class="mx-auto login-form">
              <v-card-text>
                <v-text-field v-model="username" :rules="[rules.username]" label="Username" clearable required></v-text-field>
                <v-text-field v-model="password" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.password]"
                  :type="passwordShow ? 'text' : 'password'" label="Password" clearable required @click:append="passwordShow = !passwordShow">
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn :disabled="sending || !valid" type="submit" variant="flat" color="primary" @click="login">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>

      </v-menu>
      <v-divider class="border-opacity-0" color="info" vertical thickness="8"></v-divider>
      <v-tooltip text="No yet implemented" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn @click="showSignIn" variant="flat" rounded color="#ff6363" v-bind="props">
            Sign In
          </v-btn>
        </template>
      </v-tooltip>
      <v-divider class="border-opacity-0" color="info" vertical thickness="128"></v-divider>
    </v-toolbar>
    <div class="the-big-one">Designed by indies for <span class="word-important">indies</span></div>
    <v-divider class="border-opacity-0" color="info" thickness="64"></v-divider>
  </div>
  <div class="tool-title">
    Indie Maker Tool
  </div>
  <v-divider class="border-opacity-0" color="info" thickness="18"></v-divider>
  <v-container class="feature-item-list">
    <v-row no-gutters align="center" >
      <v-col cols="12" sm="4" align="center">
        <v-card class="feature-item ma-2 pa-2" color="#393e46">
          <v-icon class="catchicon">mdi-open-source-initiative</v-icon>
          <div class="catchphrase">Open source</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" align="center">
        <v-card class="feature-item ma-2 pa-2" color="#393e46">
          <v-icon class="catchicon">mdi-bug-check</v-icon>
          <div class="catchphrase">Gather and manage bug reports</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" align="center">
        <v-card class="feature-item ma-2 pa-2" color="#393e46">
          <v-icon class="catchicon">mdi-key-variant</v-icon>
          <div class="catchphrase">Manage Steam keys</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./index.js"></script>
<style src="./style.css"  ></style>
