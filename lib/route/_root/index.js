const path = require('path')
const config = require('config')
const websiteConfig = config.get('website')

// Serve public routes
module.exports = {
  method: 'GET',
  path: '{param*}',
  handler: {
    directory: {
      path: `${process.cwd()}${path.sep}${websiteConfig.public}${path.sep}`,
      redirectToSlash: true,
      index: true
    }
  },
  options: {
    auth: false
  }
}
