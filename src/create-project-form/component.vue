<template>
  <v-divider></v-divider>
  <v-dialog persistent v-model="openDialogValue">
    <v-card width="512" class="mx-auto">
      <v-toolbar dark color="indigo">
        <v-toolbar-title>Create new project</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <template v-if="!sending && !projectReceived">
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="applicationName" :rules="[rules.applicationName]" label="Application name" clearable required>
            </v-text-field>
            <v-text-field  v-model="applicationId" :rules="[rules.applicationId]" label="Application ID (Steam ID)" clearable required>
            </v-text-field>
            <v-text-field v-model="applicationSecret" :rules="[rules.applicationSecret]" label="Application secret" clearable required>
            </v-text-field>
            <v-text-field v-model="applicationToken" :rules="[rules.applicationToken]" label="Application API token" clearable required>
            </v-text-field>
            <v-text-field  v-model="email" :rules="[rules.email]" label="Notification email" clearable>
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="sending || dialogForced" depressed small value="" color="indigo" @click="closeDialog">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="sending || !valid" depressed small value="" color="indigo" @click="createProject">
            Create new project
          </v-btn>
        </v-card-actions>
      </template>
      <template v-if="sending">
        <v-card-text>
          Creating new project...
          <v-progress-linear indeterminate color="indigo" class="mb-0" ></v-progress-linear> 
        </v-card-text>
      </template>
      <template v-if="!sending && projectReceived">
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="applicationName" label="Application name" readonly required>
            </v-text-field>
            <v-text-field  v-model="applicationId" label="Application ID (Steam ID)" readonly required>
            </v-text-field>
            <v-text-field v-model="applicationSecret" label="Application secret" readonly required>
            </v-text-field>
            <v-text-field  v-model="email" label="Notification email" readonly>
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn depressed small value="" color="indigo" @click="confirmProjectCreated">
            Close
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>

  </v-dialog>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
