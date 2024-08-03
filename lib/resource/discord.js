const { Client, GatewayIntentBits } = require('discord.js')

class DiscordResource {
  /**
   * Create the Discord object
   * @param {Object} options - Discord configuration
   * @returns {Promise}
   */
  constructor (rawOptions) {
    this.options = rawOptions
    this.client = new Client({ intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
    ]})
    this.ready = false

    this.listeners = {
      messageCreate: [],
      messageReactionAdd: [],
      messageReactionRemove: [],
      guildMemberRemove: [],
      guildMemberAdd: []
    }

    this.client.once('ready', this._client_ready_handler.bind(this))
    this.client.on('error', this._error_handler.bind(this))
    this.client.on('invalidated', this._invalidated_handler.bind(this))
    this.client.on('rate_limit', this._rate_limit_handler.bind(this))

    this.client.on('messageCreate', this._event_handler.bind(this, 'messageCreate'))
    this.client.on('messageReactionAdd', this._event_handler.bind(this, 'messageReactionAdd'))
    this.client.on('messageReactionRemove', this._event_handler.bind(this, 'messageReactionRemove'))
    this.client.on('guildMemberRemove', this._event_handler.bind(this, 'guildMemberRemove'))
    this.client.on('guildMemberAdd', this._event_handler.bind(this, 'guildMemberAdd'))

    this.client.login(rawOptions.token)
  }

  _client_ready_handler(readyClient) {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)

    this.ready = true
  }

  _error_handler(error) {
    console.error(`Discord encountered an error ${error}`)
  }

  _invalidated_handler() {

    console.error('Connection invalidated, destroying client')

    this.client.destroy()
    this.ready = false
  }

  _rate_limit_handler(rateLimitInfo) {

    // TODO
    // Add a check for timeout
    // is_discord_timed_out()
    console.warning(`Rate limit reached !!`)
    console.warning(`| Timed out for ${rateLimitInfo.timeout / 1000} seconds`)
    console.warning(`| Path that triggered the timeout: ${rateLimitInfo.path}`)
    console.warning(`| Route that triggered the timeout: ${rateLimitInfo.route}`)
  }

  _event_handler(event_type, message) {
    if (message.author.id == this.options.client_id) {
      // Do not forward an event we created
      return
    }

    if (this.listeners[event_type] != null) {
      this.listeners[event_type].forEach((handler) => handler(message))
    }
  }

  on(type, callback) {
    if (this.listeners[type] != null) {
      this.listeners[type].push(callback)
    }
  }

  sendMessage() {
    if (!this.ready) {
      throw new Error('Discord JS not ready')
    }
  }

  sendDM(discordUserId, message) {
    if (!this.ready) {
      throw new Error('Discord JS not ready')
    }

    return this.client.users.send(discordUserId, message)
  }
}

module.exports = (options) => Promise.resolve(['discord', new DiscordResource(options)])
