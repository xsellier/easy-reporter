<template>
  <v-snackbar
    v-model="showSnackbar">
  {{ message }}
  <v-btn
    color="pink"
    flat
    @click="showSnackbar = false">
    Close
  </v-btn>
</v-snackbar>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
