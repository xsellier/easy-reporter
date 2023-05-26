<template>
  <v-snackbar v-model="showSnackbar">{{ computedMessage }}
    <template v-slot:actions>
      <v-btn :color="color" @click="showSnackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
