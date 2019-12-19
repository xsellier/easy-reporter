const config = require('config')
const resources = require('./resource')
const routeDirectories = require('./route')
const authentication = require('./module/authentication')

const packageJson = require('../package.json')

// Note:
// Environment variable automatically loaded by Heroku
delete process.env.DATABASE_URL

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
  })
  .catch((err) => {
    console.error(`Could not initialize ${packageJson.name}.`)
    console.error(err)

    process.exit(1)
  })
