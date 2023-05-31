<template>
  <div class="vertical-division">
    <div class="list">
      <v-list :lines="false" density="compact" nav>
        <v-list-item>
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn :disabled="sending" v-model="showConsumed" color="indigo"></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title>Invitation list</v-list-item-title>
          <v-list-item-subtitle>Show consumed invitation</v-list-item-subtitle>
        </v-list-item>

        <v-list-item :disabled="sending" subtitle="Invite new member" prepend-icon="mdi-account-plus-outline" @click="createInvitation()"></v-list-item>
        <v-list-item v-for="item in invitation" :key="item.name" :value="item.name" @click="copyToClipboard(item.name)" active-color="indigo" :prepend-icon="computeInvitationIcon(item.invite)" :title="item.name" :subtitle="item.created_at">
          <template  v-slot:append="{ isActive }">
            <v-list-item-action v-if="item.invite == null">
              <v-btn :disabled="sending" icon="mdi-close" @click="cancelInvitation(item.name)" size="x-small" color="red-accent-1"></v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
      <v-pagination v-model="invitationCurrentPage" :length="invitationTotalPages" @update:modelValue="changeInvitationPage()" size="x-small" total-visible=6 density="compact"></v-pagination>
      <v-list :lines="false" density="compact" nav>
        <v-list-subheader>User list</v-list-subheader>
        <v-list-item v-for="item in user" :key="item.id" :value="item.username" active-color="indigo" :title="item.username" :subtitle="item.created_at" @click="listUserProject(item.id)">
          <template v-slot:prepend>
            <v-icon>{{ computeIconFromUserType(item.type) }}</v-icon>
          </template>
          <template v-slot:append>
            <v-btn :disabled="sending" :icon="computeIconFromUserBan(item.banned)" @click="setUserBan(item)" size="x-small" :color="computeColorFromUserBan(item.banned)"></v-btn>
            &nbsp;<v-btn v-if="!isUserAdmin(item)" :disabled="sending" icon="mdi-close" @click="removeUser(item)" size="x-small" color="red-accent-1"></v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-pagination v-model="currentPage" :length="totalPages" @update:modelValue="changePage()" size="x-small" total-visible=6 density="compact"></v-pagination>
      <v-container fluid>
        <v-btn :disabled="sending" variant="flat" color="indigo" prepend-icon="mdi-refresh" @click="listUser()">refresh member list</v-btn>
      </v-container>
    </div>
    <div class="settings">
      <v-card>
        <template v-if="sending">
          <v-progress-linear indeterminate color="indigo" class="mb-0" ></v-progress-linear> 
        </template>
        <v-list dense>
          <v-list-item>
            <v-text-field :disabled="sending || !projectValid" v-model="application_name" label="Project Name" :rules="[rules.applicationName]" append-icon="mdi-content-save" @click:append="updateApplicationName"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field :disabled="sending || !projectValid" v-model="application_id" label="Application Id" :rules="[rules.applicationId]" append-icon="mdi-content-save" @click:append="updateApplicationId"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field :disabled="sending || !projectValid" v-model="email" label="Notification Email" :rules="[rules.email]" append-icon="mdi-content-save" @click:append="updateEmail"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field :disabled="sending || !projectValid" v-model="secret" type="password" label="Application secret" :rules="[rules.applicationSecret]" append-icon="mdi-content-save" @click:append="updateSecret"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field :disabled="sending || !projectValid" v-model="apiToken" type="password" label="Application token" :rules="[rules.applicationToken]" append-icon="mdi-content-save" @click:append="updateToken"></v-text-field>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn :disabled="sending || !projectValid" variant="flat" color="error" prepend-icon="mdi-trash-can" @click="archiveProject()">{{ archived ? "Unarchive": "Archive" }}</v-btn>
        </v-card-actions>
        <v-pagination v-model="projectCurrentPage" :length="projectTotalPages" @update:modelValue="changeProjectPage()" size="x-small" total-visible=6 density="compact"></v-pagination>
      </v-card>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
