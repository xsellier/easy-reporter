<template>
  <div class="vertical-division">
    <div class="member-list">
      <v-list :lines="false" density="compact" nav>
        <v-list-subheader>Project member list</v-list-subheader>
        <v-list-item v-for="item in member" :key="item.id" :value="item.username" active-color="indigo" >
          <template v-slot:prepend v-if="item.is_admin == 1">
            <v-icon>mdi-security</v-icon>
          </template>
          <template v-slot:prepend v-else>
            <v-btn density="compact" icon="mdi-account-remove" @click="removeUserFromProject(item.id)"></v-btn>
          </template>
          <v-list-item-title v-text="item.username"></v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
    <div class="settings">
      <v-card>
        <template v-if="sending">
          <v-progress-linear indeterminate color="indigo" class="mb-0" ></v-progress-linear> 
        </template>
        <v-list dense>
          <v-list-item>
            <v-text-field :disabled="sending" v-model="application_name" label="Project Name" :rules="[rules.applicationName]" append-icon="mdi-content-save" @click:append="updateApplicationName"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field :disabled="sending" v-model="application_id" label="Application Id" :rules="[rules.applicationId]" append-icon="mdi-content-save" @click:append="updateApplicationId"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field :disabled="sending" v-model="email" label="Notification Email" :rules="[rules.email]" append-icon="mdi-content-save" @click:append="updateEmail"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field :disabled="sending" v-model="secret" type="password" label="Application secret" :rules="[rules.applicationSecret]" append-icon="mdi-content-save" @click:append="updateSecret"></v-text-field>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn :disabled="sending" variant="flat" color="error" prepend-icon="mdi-trash-can" @click="archiveProject()">Archive</v-btn>
          <v-btn :disabled="sending" variant="flat" color="indigo" prepend-icon="mdi-refresh" @click="listMember">refresh member list</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
