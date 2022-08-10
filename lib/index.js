const http = require('http')
const config = require('config')
const resources = require('./resource')
const routeDirectories = require('./route')
const authentication = require('./module/authentication')

const packageJson = require('../package.json')

// Note:
// Environment variable automatically loaded by Heroku
delete process.env.DATABASE_URL

process.title = 'easy-reporter'

const keepAlive = () => {
  setTimeout(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`, (res) => {
      console.info(`Sending another keep alive to http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
      process.nextTick(keepAlive)
    })
  }, 120000)
}

// Initialize app components
Promise.resolve()
  .then(resources.init)
  .then(() => resources.server.register(require('inert')))
  .then(() => resources.server.register(require('hapi-auth-bearer-token')))
  .then(() => {
    resources.server.auth.strategy('simple', 'bearer-access-token', {
      allowQueryToken: true,
      allowChaining: false,
      validate: authentication.validate
    })

    resources.server.auth.default('simple')
    resources.server.routes(routeDirectories)
  })
  .then(() => {
    resources.server.start()
    console.info(`${packageJson.name} operational (${config.server.host}:${config.server.port}/)`)
    console.info(`Ready to receive bugreport! Prepping keepAlives request!`)

    // keepAlive()
  })
  .catch((err) => {
    console.error(`Could not initialize ${packageJson.name}.`)
    console.error(err)

    process.exit(1)
  })
