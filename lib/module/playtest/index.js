const PlaytestModel = require('../../model/playtest')
const ProjectModel = require('../../model/project')
const ProjectModule = require('../../module/project')
const resources = require('../../resource')

class Playtest {
  constructor () {
    console.log('Starting playtest module...')

    resources.discord.on('messageCreate', this._on_discord_message.bind(this))
    resources.discord.on('guildMemberRemove', this._on_discord_member_left.bind(this))
    resources.discord.on('guildMemberAdd', this._on_discord_member_joined.bind(this))
  }

  async _on_discord_message(message) {
    let channelId = message.channel.id
    let discordUserId = message.author.id

    switch(message.content) {
      case '!register':
        await this._update_user_registration(message, true)
        break

      case '!unregister':
        await this._update_user_registration(message, false)
        break

      case '!help':
        let playtest_data = await PlaytestModel.getPlaytestFromDiscordChannelId(channelId)

        if (playtest_data != null) {
          if (playtest_data.enabled == 1) {
            message.channel.send(`${playtest_data.message}`)
          } else {
            message.channel.send(`Playtests are now disabled. Thank you for your help ${message.author.displayName}`)
          }
        }
        break

      default:
        break
    }
  }

  async _update_user_registration(discordMessage, register = true) {
    let channelId = discordMessage.channel.id
    let discordUserId = discordMessage.author.id
    let playtest_data = await PlaytestModel.getPlaytestFromDiscordChannelId(channelId)

    if (playtest_data != null) {
      if (playtest_data.enabled == 1) {
        await PlaytestModel.upsertPlaytestUser(playtest_data.project_id, discordUserId, register, true, discordMessage.author.username, discordMessage.author.createdTimestamp, Date.now())

        // TODO
        // Récuperer le Steam ID via discord
        if (register) {
          let user_steam_key = await PlaytestModel.getDiscordUserSteamKey(playtest_data.project_id, discordUserId)

          if (user_steam_key == null) {
            // No steam key yet
            discordMessage.channel.send(`You're now registered for the playtests. I'll DM you once a Steam key is available ${discordMessage.author.displayName}`)
          } else {
            // Already has a steam key
            discordMessage.channel.send(`You already have a Steam key ${discordMessage.author.displayName}. I've just DM you with the Steam key`)

            this.sendSteamKeyToUser(playtest_data.project_id, discordUserId)
          }
        } else {
          // No steam key yet
          discordMessage.channel.send(`You're no longer part of the playtests ${discordMessage.author.displayName}.`)
        }
      } else {
        // Playtests are disabled
        discordMessage.channel.send(`Playtests are now disabled. Thank you for your help ${discordMessage.author.displayName}`)
      }
    }
  }

  async _on_discord_member_left(member) {
    let discordUserId = member.author.id

    // TODO
    // Envoyer un DM d'avertissement si le mec quitte le serveur discord pour dire que
    // sa clé va être désactivée (automatique)
    await PlaytestModel.updatePlaytestUserPresence(discordUserId, false)
  }

  async _on_discord_member_joined(member) {
    let discordUserId = member.author.id

    await PlaytestModel.updatePlaytestUserPresence(discordUserId, true)
  }

  list (token) {
    return ProjectModule.list(token)
      .then((projectList) => {
        return Promise.all(projectList.map((projectData) => this.get(item.projectData.id)))
      }).then((playtestList) => {
        return playtestList.filter((playtestData) => playtestData != null)
      })
  }

  get (token, projectId) {
    return ProjectModule.isProjectMember(token, projectId)
      .then((result) => PlaytestModel.getPlaytest(projectId))
  }

  banSteamKey (token, projectId, steamKeyId) {
    // TODO
    throw new Error('Not yet implemented')
  }

  banAllSteamKey (token, projectId) {
    // TODO
    throw new Error('Not yet implemented')
  }

  create (token, projectId, enabled, discordChannelId, message, formUrl) {
    return ProjectModule.isProjectAdmin(token, projectId)
      .then((result) => PlaytestModel.upsertPlaytest(projectId, enabled, discordChannelId, message, formUrl))
  }

  togglePlaytest (token, projectId, enabled) {
    return ProjectModule.isProjectAdmin(token, projectId)
      .then((result) => PlaytestModel.togglePlaytest(projectId, enabled))
  }

  updateDiscordChannelId (token, projectId, discordChannelId) {
    return ProjectModule.isProjectAdmin(token, projectId)
      .then((result) => PlaytestModel.updateDiscordChannelId(projectId, discordChannelId))
  }

  updateMessage (token, projectId, message) {
    return ProjectModule.isProjectAdmin(token, projectId)
      .then((result) => PlaytestModel.updateMessage(projectId, message))
  }

  updateFormUrl (token, projectId, formUrl) {
    return ProjectModule.isProjectAdmin(token, projectId)
      .then((result) => PlaytestModel.updateFormUrl(projectId, formUrl))
  }

  cancelSteamKey (token, projectId, steamKeyId) {
    return ProjectModule.isProjectAdmin(token, projectId)
      .then((result) => PlaytestModel.getDiscordUserFromSteamKey(projectId, steamKeyId))
      .then((attachedDiscordUser) => {
        if (attachedDiscordUser != null) {
          throw new Error(`Steam key already used by ${JSON.stringify(attachedDiscordUser)}`)
        } else {
          return PlaytestModel.cancelSteamKey(projectId, steamKeyId)
        }
      })
  }

  async sendSteamKeys (token, projectId, steamKeyAmount) {
    // Make the request crashes if the user ain't a project admin
    await ProjectModule.isProjectAdmin(token, projectId)

    let steamKeyDataList = await PlaytestModel.getAvailableSteamKey(projectId, steamKeyAmount)
    let discordUserDataList = await PlaytestModel.getAvailableDiscordUser(projectId, steamKeyAmount)

    return Promise.all(discordUserDataList.map((discordUserData, index) => {
      if (index < steamKeyDataList.length) {
        return PlaytestModel.attachSteamKeyToUser(projectId, steamKeyDataList[index].id, discordUserData.discord_user_id, steamKeyDataList[index].value)
          .then(() => this.sendSteamKeyToUser(projectId, discordUserData.discord_user_id))
      } else {
        return Promise.resolve()
      }
    }))
  }

  sendDMFeedback(token, projectId) {
    return ProjectModule.isProjectMember(token, projectId)
      .then((result) => PlaytestModel.listDiscordUserWithoutFeedback(projectId))
      .then((discordUserList) => this.batchSendDM(projectId, discordUserList))
  }

  insertSteamKey(token, projectId, steamKeyList) {
    return ProjectModule.isProjectAdmin(token, projectId)
      .then((result) => PlaytestModel.insertSteamKey(projectId, steamKeyList))
  }

  updateDiscordUserIdFeedback(token, projectId, discordUserId, feedback) {
    return ProjectModule.isProjectMember(token, projectId)
      .then((result) => PlaytestModel.updateDiscordUserIdFeedback(projectId, discordUserId, feedback))
  }

  async attachSteamKeyToUser(token, projectId, discordUserId) {
    return ProjectModule.isProjectAdmin(token, projectId)
      .then((result) => PlaytestModel.getDiscordUserSteamKey(projectId, discordUserId))
      .then((steamKeyValue) => {
        if (steamKeyValue != null) {
          throw new Error(`User ${discordUserId} already has a steam key ${steamKeyValue}`)
        }

        return PlaytestModel.getFirstAvailableSteamKey(projectId)
      })
      .then((steamKeyData) => {
        if (steamKeyData == null) {
          throw new Error('No Steam key Available')
        }
        return PlaytestModel.attachSteamKeyToUser(projectId, steamKeyData.id, discordUserId, steamKeyData.value)
      })
      .then(() => this.sendSteamKeyToUser(projectId,discordUserId))
  }

  async batchSendDM(projectId, discordUserList) {
    var playtestData = await PlaytestModel.getPlaytest(projectId)
    var projectData = await ProjectModel.get(projectId)

    return Promise.all(discordUserList.map((discordUserItem) => {
      return this.sendSteamKeyToUserAndAskForFeedback(projectData.name, playtestData.form_url, discordUserItem.discord_user_id, discordUserItem.steam_key)
    }))
  }

  async sendSteamKeyToUser(projectId, discordUserId) {
    var steamKeyValue = await PlaytestModel.getDiscordUserSteamKey(projectId, discordUserId)
    var playtestData = await PlaytestModel.getPlaytest(projectId)
    var projectData = await ProjectModel.get(projectId)

    return resources.discord.sendDM(discordUserId, `Hey,

Congratulations you've been selected to receive a FREE steam key for **${projectData.name}**!

__Please, don't forget to fill up the feedback form:__
<${playtestData.form_url}>

__Here's your Steam Key__
\`${steamKeyValue}\`
Cheers!`)
  }

  async sendSteamKeyToUserAndAskForFeedback(projectName, projectFormUrl, discordUserId, steamKeyValue) {
    return resources.discord.sendDM(discordUserId, `Hey,

I hope you enjoy playing **${projectName}**!

Please, fill up this feedback form, it takes up to 5 minutes max (less than 8 questions)
<${projectFormUrl}>

__If you've lost your steam key, here's a reminder__
\`${steamKeyValue}\`

Cheers!`)
  }

  listDiscordUser (token, projectId) {
      return ProjectModule.isProjectMember(token, projectId)
      .then((result) => PlaytestModel.listDiscordUser(projectId))
  }

  listSteamKeyWithDiscordUser (token, projectId) {
    return ProjectModule.isProjectMember(token, projectId)
      .then((result) => PlaytestModel.listSteamKeyWithDiscordUser(projectId))
  }
}

module.exports = new Playtest()
