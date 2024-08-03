<template>
  <div class="vertical-division">
    <div class="list">
      <v-card>
        <v-tabs v-model="tabView" fixed-tabs>
          <v-tab value="discordUsers" text="Discord users"></v-tab>
          <v-tab value="steamKeys" text="Steam keys"></v-tab>
        </v-tabs>
        <v-card-text>
          <v-tabs-window v-model="tabView">
            <v-tabs-window-item value="discordUsers">
              <v-list class="discord-user-list" density="compact">
                <v-list-subheader>Discord user list ({{ discordUserList.length }} / {{ discordUserList.length }})</v-list-subheader>
                <v-list-item v-for="discordUserItem in discordUserList" :key="discordUserItem.discord_user_id">
                  <v-list-item-title>{{ discordUserItem.discord_user_username }}</v-list-item-title>
                  <template v-slot:prepend>
                    <v-icon icon="mdi-account-alert" v-if="discordUserItem.present != 1"></v-icon>
                    <v-icon icon="mdi-account-cancel" v-if="discordUserItem.registered != 1"></v-icon>
                  </template>
                  <template v-slot:append>
                    <v-btn color="grey-lighten-1" icon="mdi-content-copy" variant="text" @click="copyClipboard(discordUserItem.steam_key)" v-if="discordUserItem.steam_key != null"></v-btn>
                    <v-btn color="grey-lighten-1" icon="mdi-steam" variant="text" :href="getSteamProfile(discordUserItem.steam_account_id)" v-if="discordUserItem.steam_account_id != null"></v-btn>
                    <v-btn color="grey-lighten-1" icon="mdi-key-variant" variant="text" @click="assignSteamKey(discordUserItem.discord_user_id)" v-if="discordUserItem.steam_key == null && discordUserItem.present == 1 && discordUserItem.registered == 1"  target="_blank"></v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-tabs-window-item>

            <v-tabs-window-item value="steamKeys">
              <v-list class="steam-key-list" density="compact">
                <v-list-subheader>Steam key list ({{ steamKeyList.length }} / {{ steamKeyList.length }})</v-list-subheader>
                <v-list-item v-for="steamKeyItem in steamKeyList" :key="steamKeyItem.id">
                  <v-list-item-title>{{ steamKeyItem.value }}</v-list-item-title>
                  <template v-slot:prepend v-if="steamKeyItem.discord_channel_id != null">
                    <v-icon icon="mdi-paperclip"></v-icon>
                  </template>
                  <template v-slot:append>
                    <v-btn color="grey-lighten-1" icon="mdi-content-copy" variant="text" @click="copyClipboard(steamKeyItem.value)"></v-btn>
                    <v-btn color="grey-lighten-1" icon="mdi-close-circle" variant="text" @click="cancelSteamKey(steamKeyItem.id)"></v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </div>
    <div class="settings">
      <v-card>
        <template v-if="sending">
          <v-progress-linear indeterminate color="indigo" class="mb-0" ></v-progress-linear> 
        </template>
        <v-form v-model="formPlaytest">
          <v-list dense>
            <v-list-item>
              <v-switch color="primary" :disabled="sending || !is_admin" v-model="playtestEnabled" label="Playtests active?" :append-icon="playtestCreated ? 'mdi-content-save' : ''" @click:append="updatePlaytestEnabled"></v-switch>
            </v-list-item>
            <v-list-item>
              <v-text-field :disabled="sending || !is_admin" v-model="playtestDiscordChannelId" label="Discord Channel Id" :rules="[rules.playtestDiscordChannelId]" :append-icon="playtestCreated ? 'mdi-content-save' : ''" @click:append="updatePlaytestDiscordChannelId"></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-textarea :disabled="sending || !is_admin" v-model="playtestMessage" label="Message" :rules="[rules.playtestMessage]" :append-icon="playtestCreated ? 'mdi-content-save' : ''" @click:append="updatePlaytestMessage"></v-textarea>
            </v-list-item>
            <v-list-item>
              <v-text-field :disabled="sending || !is_admin" v-model="playtestFormUrl" label="form URL" :rules="[rules.playtestFormUrl]" :append-icon="playtestCreated ? 'mdi-content-save' : ''" @click:append="updatePlaytestFormUrl"></v-text-field>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn :disabled="sending || !is_admin || !formPlaytest" variant="flat" color="indigo" prepend-icon="mdi-refresh" @click="refreshPlaytest()">Refresh playtest</v-btn>
            <v-btn :disabled="sending || !is_admin || !formPlaytest" variant="flat" color="indigo" prepend-icon="mdi-refresh" @click="upsertPlaytest()">Update playtest</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>

      <v-card>
        <template v-if="sending">
          <v-progress-linear indeterminate color="indigo" class="mb-0" ></v-progress-linear> 
        </template>
        <v-form v-model="formSteamKey">
          <v-list dense>
            <v-list-item>
              <v-textarea :disabled="sending || !is_admin" v-model="playtestSteamKeys" label="Steam key list. One steam key per line" :rules="[rules.playtestSteamKeys]"></v-textarea>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn :disabled="sending || !is_admin || !formSteamKey || !playtestCreated" variant="flat" color="indigo" prepend-icon="mdi-refresh" @click="insertSteamKeys()">Insert steam keys</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
