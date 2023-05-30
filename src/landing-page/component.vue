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
          <v-btn variant="outlined" rounded v-bind="props" color="#fefefe" @click="validateLoginForm()">
            Login
          </v-btn>
        </template>
        <v-form class="formclass" ref="loginForm" v-model="loginValid" @submit.prevent="login" validate-on="input">
          <v-card max-width="512" class="mx-auto login-form">
            <v-card-text>
              <v-text-field v-model="username" :rules="[rules.username]" label="Username" clearable required></v-text-field>
              <v-text-field v-model="password" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.password]"
                :type="passwordShow ? 'text' : 'password'" label="Password" clearable required @click:append="passwordShow = !passwordShow">
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn :disabled="sending || !loginValid" type="submit" variant="flat" color="indigo">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-menu>
      <v-divider class="border-opacity-0" color="info" vertical thickness="8"></v-divider>
      <v-menu :close-on-content-click="false" v-model="signInMenu">
        <template v-slot:activator="{ props }">
          <v-btn variant="flat" rounded v-bind="props" color="#ff6363" @click="validateSignInForm()">
            Sign In
          </v-btn>
        </template>
        <v-form class="formclass" ref="signInForm" v-model="signInValid" @submit.prevent="signin" validate-on="input">
          <v-card max-width="512" class="mx-auto login-form">
            <v-card-text>
              <v-text-field v-model="invitation" :rules="[rules.invitation]" label="Invitation key" clearable required></v-text-field>
              <v-text-field v-model="username" :rules="[rules.username]" label="Username" clearable required></v-text-field>
              <v-text-field v-model="password" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.password]"
                :type="passwordShow ? 'text' : 'password'" label="Password" clearable required @click:append="passwordShow = !passwordShow">
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn :disabled="sending || !signInValid" type="submit" variant="flat" color="indigo">
                Sign In
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-menu>
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
