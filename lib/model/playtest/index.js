const path = require('path')
const config = require('config')

const sqlLoader = require('../../util/sql-loader')
const resources = require('../../resource')

const resultPerPage = config.sql.pagination
const queriesPath = path.join(__dirname, config.sql.relativeDirectory)
const queries = sqlLoader.loadSync(queriesPath, config.sql.encoding)

class Playtest {

  static upsertPlaytest (projectId, enabled, discordChannelId, message, formUrl) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['upsert-playtest'], [projectId, enabled, discordChannelId, message, formUrl])
      })
  }

  static getDiscordUserFromSteamKey(projectId, steamKeyId) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['get-discord-user-from-steam-key'], [projectId, steamKeyId])
      })
      .then((result) => {
        return result.length > 0 ? result[0].discord_user_id : null
      })
  }

  static getSteamKey(projectId, steamKeyId) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['get-steam-key'], [projectId, steamKeyId])
      })
      .then((result) => {
        return result.length > 0 ? result[0].value : null
      })
  }

  static togglePlaytest (projectId, enabled) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['toggle-playtest'], [enabled, projectId])
      })
  }

  static updateDiscordChannelId(projectId, discordChannelId) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['update-playtest-discord-channel-id'], [discordChannelId, projectId])
      })
  }

  static updateMessage(projectId, message) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['update-playtest-message'], [message, projectId])
      })
  }

  static updateFormUrl(projectId, formUrl) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['update-playtest-form-url'], [formUrl, projectId])
      })
  }

  static upsertPlaytestUser (projectId, discordUserId, registered, present, discordUsername, discordAccountCreationDate, discordServerJoinDate) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['upsert-user'], [projectId, discordUserId, registered, present, discordUsername, discordAccountCreationDate, discordServerJoinDate])
      })
  }

  static updatePlaytestUserPresence (discordUserId, present) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['update-playtest-user-presence'], [present, discordUserId])
      })
  }

  static insertSteamKey (projectId, steamKeyList) {
    // Bulk insert steam keys
    let computed_values = steamKeyList.reduce((acc, steamKey) => {
      return acc == null ? `(${projectId}, '${steamKey}')` : `${acc},
      (${projectId}, '${steamKey}')`
    }, null)
    let customized_query = queries['insert-steam-key'].replace('__STEAM_KEY_LIST__', computed_values)

    return Promise.resolve()
      .then(() => resources.database.query(customized_query, []))
  }

  static cancelSteamKey(projectId, steamKeyId) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['cancel-steam-key'], [projectId, steamKeyId])
      })
  }

  static attachSteamKeyToUser (projectId, steamKeyId, discordUserId, steamKeyValue) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['attach-steam-key-to-user'], [steamKeyId, discordUserId, projectId, steamKeyValue])
      })
      .then((result) => {
        return result.length > 0 ? result[0].steamKeyValue : null
      })
  }

  static updateDiscordUserPresence (projectId, discordUserId, present) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['update-discord-user-presence'], [present, projectId, discordUserId])
      })
  }

  static updateDiscordUserRegistered (projectId, discordUserId, registered) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['update-discord-user-registered'], [registered, projectId, discordUserId])
      })
  }

  static getPlaytest (projectId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-playtest'], [projectId]))
      .then((result) => {
        return result.length > 0 ? result[0] : null
      })
  }

  static listDiscordUser (projectId) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['list-discord-user'], [projectId])
    })
  }

  static listSteamKeyWithDiscordUser (projectId) {
    return Promise.resolve()
      .then(() => {
        return resources.database.query(queries['list-steam-key'], [projectId])
    })
  }

  static getDiscordUserSteamKey (projectId, discordUserId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-discord-user-steam-key'], [projectId, discordUserId]))
      .then((result) => {
        return result.length > 0 ? result[0].steam_key : null
      })
  }

  static getPlaytestFromDiscordChannelId(discordChannelId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-playtest-from-discord-channel-id'], [discordChannelId]))
      .then((result) => {
        return result.length > 0 ? result[0] : null
      })
  }

  static getFirstAvailableSteamKey(projectId) {
    return Promise.resolve()
      .then(() => resources.database.query(queries['get-first-available-steam-key'], [projectId]))
      .then((result) => {
        return result.length > 0 ? result[0] : null
      })
  }
}

module.exports = Playtest
