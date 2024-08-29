import { useDate } from 'vuetify'

export default {
  name: 'Playtests',
  props:['token', 'application_data'],
  emits: ['update:token'],
  data: () => ({
    tabView: 'discordUsers',

    formPlaytest: false, 
    formSteamKey: false,

    numberOfSteamKeyToSend: 0,

    playtestEnabled: false,
    playtestDiscordChannelId: 0,
    playtestDiscordRoleId: 0,
    playtestMessage: '',
    playtestFormUrl: '',

    playtestSteamKeys: '',

    steamKeyList: [],
    discordUserList: [],

    project_id: 0,

    playtestCreated: false,
    is_admin: false,
    sending: false,
    rules: {
      playtestDiscordChannelId: (value) => !!value || 'Discord channel id is required',
      playtestDiscordRoleId: (value) =>  !!value || 'Discord role id is required',
      playtestMessage: (value) => !!value || 'Message is required',
      playtestFormUrl: (value) => !!value || 'Form URL is required',
      playtestSteamKeys: (value) => !!value || 'Add one steam key per line'
    }
  }),
  watch: {
    application_data(value) {
      this.project_id = value.id
      this.is_admin = value.is_admin

      return this.getPlaytest()
        .then(() => this.listSteamKeys())
        .then(() => this.listDiscordUsers())
    }
  },
  mounted() {
    this.project_id = this.application_data.id
    this.is_admin = this.application_data.is_admin

    return this.getPlaytest()
      .then(() => this.listSteamKeys())
      .then(() => this.listDiscordUsers())
  },
  methods: {
    refreshPlaytest: function () {
      return this.getPlaytest()
        .then(() => this.listSteamKeys())
        .then(() => this.listDiscordUsers())
    },

    getPlaytest: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/playtest/${this.project_id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false

        if (response.data != null && response.data.discord_channel_id != null) {
          this.playtestEnabled = response.data.enabled == 1
          this.playtestDiscordChannelId = response.data.discord_channel_id
          this.playtestDiscordRoleId = response.data.discord_role_id
          this.playtestMessage = response.data.message
          this.playtestFormUrl = response.data.form_url

          this.playtestCreated = true
        } else {
          this.playtestEnabled = false
          this.playtestDiscordChannelId = 0
          this.playtestDiscordRoleId = 0
          this.playtestMessage = ''
          this.playtestFormUrl = ''

          this.playtestCreated = false
        }
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot get playtest data', err)
      })
    },

    getSteamProfile: function(steamAccountId) {
      return `https://steamcommunity.com/id/${steamAccountId}`
    },

    computeAvailableKeys: function(steamKeyList) {
      return steamKeyList.filter((steamKeyData) => steamKeyData.discord_user_id == null).length
    },

    obfuscateSteamKey: function(steamKeyValue) {
      let firstPart = steamKeyValue.substr(0, 4)
      let lastPart = steamKeyValue.substr(4).replaceAll(/.{1}/gi, '*')

      return `${firstPart}${lastPart}`
    },

    getVerifySteamKeyUrl: function(steamKeyValue) {
      return `https://partner.steamgames.com/querycdkey/cdkey?cdkey=${steamKeyValue}&method=V%C3%A9rifier`
    },

    computeActivePlaytester: function(discordUserList) {
      let filteredDiscordUserList = discordUserList.filter((discordUserData) => {
        return discordUserData.steam_key != null && discordUserData.registered == 1 && discordUserData.present == 1
      })

      return filteredDiscordUserList.length
    },

    assignSteamKey: function(discordUserId) {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/playtest/${this.project_id}/attachSteamKeyToUser`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          discordUserId: discordUserId
        }
      })
      .then((response) => {
        this.sending = false

        return this.listSteamKeys()
          .then(() => this.listDiscordUsers())
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot assign Steam keys', err)
      })
    },

    listSteamKeys: function() {
      if (!this.playtestCreated) {
        this.steamKeyList = []

        return Promise.resolve()
      }

      this.sending = true

      return this.$http({
        method: 'get',
        url: `/playtest/${this.project_id}/listSteamKey`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        this.steamKeyList = response.data
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list steam keys', err)
      })
    },

    copyClipboard: function (value) {
      navigator.clipboard.writeText(value)
    },

    formatDate: function(value) {
      return useDate().format(value, 'keyboardDate')
    },

    updateDiscordUserFeedback: function(feedbackReceived, discordUserId) {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/playtest/${this.project_id}/${discordUserId}/feedback`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          feedback: feedbackReceived
        }
      })
      .then((response) => {
        this.sending = false

        return this.listDiscordUsers()
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update discord user feedback', err)
      })
    },

    sendDMFeedback: function() {
      if (!this.playtestCreated) {
        return Promise.resolve()
      }

      this.sending = true

      return this.$http({
        method: 'post',
        url: `/playtest/${this.project_id}/sendDMFeedback`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot send DM feedback', err)
      })
    },

    listDiscordUsers: function() {
      if (!this.playtestCreated) {
        this.discordUserList = []

        return Promise.resolve()
      }

      this.sending = true

      return this.$http({
        method: 'get',
        url: `/playtest/${this.project_id}/listDiscordUser`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false
        this.discordUserList = response.data
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list steam keys', err)
      })
    },

    computeSteamKeyToSend: function() {
      return Math.min(this.computeAvailableKeys(this.steamKeyList), this.discordUserList.length - this.computeActivePlaytester(this.discordUserList))
    },

    sendSteamKeys: function() {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/playtest/${this.project_id}/sendSteamKeys`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          amount: this.numberOfSteamKeyToSend
        }
      })
      .then((response) => {
        this.sending = false
        this.numberOfSteamKeyToSend = 0

        return this.listSteamKeys()
          .then(() => this.listDiscordUsers())
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot send steam keys', err)
      })
    },

    cancelSteamKey: function(steamKeyId) {
      this.sending = true

      return this.$http({
        method: 'delete',
        url: `/playtest/${this.project_id}/cancel/${steamKeyId}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        // Refresh steam keys
        this.sending = false

        return this.listSteamKeys()
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot cancel Steam keys', err)
      })
    },

    insertSteamKeys: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/playtest/${this.project_id}/steamKeyList`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          steamKeyList: this.playtestSteamKeys.split('\n').map((steamKey) => steamKey.trim())
        }
      })
      .then((response) => {
        this.sending = false
        this.playtestSteamKeys = ''

        return this.listSteamKeys()
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot insert Steam keys', err)
      })
    },

    updatePlaytestEnabled: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/playtest/${this.project_id}/toggle`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          enabled: this.playtestEnabled
        }
      })
      .then((response) => {
        this.sending = false
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update playtest activation', err)
      })
    },

    updatePlaytestDiscordChannelId: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/playtest/${this.project_id}/discordChannelId`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          discordChannelId: this.playtestDiscordChannelId
        }
      })
      .then((response) => {
        this.sending = false
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update playtest discord channel id', err)
      })
    },

    updatePlaytestDiscordRoleId: function() {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/playtest/${this.project_id}/discordRoleId`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          discordRoleId: this.playtestDiscordRoleId
        }
      })
      .then((response) => {
        this.sending = false
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update playtest discord role id', err)
      })
    },

    updatePlaytestMessage: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/playtest/${this.project_id}/message`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          message: this.playtestMessage
        }
      })
      .then((response) => {
        this.sending = false
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update playtest message', err)
      })
    },

    updatePlaytestFormUrl: function () {
      this.sending = true

      return this.$http({
        method: 'put',
        url: `/playtest/${this.project_id}/formUrl`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          formUrl: this.playtestFormUrl
        }
      })
      .then((response) => {
        this.sending = false
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update form URL', err)
      })
    },

    upsertPlaytest: function () {
      this.sending = true

      return this.$http({
        method: 'post',
        url: `/playtest/create`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          projectId: this.project_id,
          enabled: this.playtestEnabled,
          discordChannelId: this.playtestDiscordChannelId,
          discordRoleId: this.playtestDiscordRoleId,
          message: this.playtestMessage,
          formUrl: this.playtestFormUrl
        }
      })
      .then((response) => {
        this.sending = false
        this.playtestCreated = true
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot create playtests', err)
      })
    }
  }
}
