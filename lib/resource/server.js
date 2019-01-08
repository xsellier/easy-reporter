const Hapi = require('hapi')

class ServerResource {
  /**
   * Create the server object
   * @param {Object} options - Server configuration
   * @returns {Promise}
   */
  constructor (options) {
    const formattedOptions = JSON.parse(JSON.stringify(options))

    this.hapi = Hapi.server(formattedOptions)
  }

  /**
   * Register routes to the server
   * @param {Array<Object>} - Array of routes
   * @returns {Promise<Object>} - The promise
   */
  routes (routes) {
    routes.forEach((route) => {
      this.hapi.route(route)
    })
  }

  get auth () {
    return this.hapi.auth
  }

  /**
   * Register a plugin
   * @param {Object} - Plugin to register
   * @returns {Promise<Object>} - The promise
   */
  async register (plugin) {
    await this.hapi.register(plugin)
  }

  /**
   * Start the server
   * @returns {Promise<Object>} - The promise
   */
  async start () {
    await this.hapi.start()
  }
}

module.exports = (options) => Promise.resolve(['server', new ServerResource(options)])
