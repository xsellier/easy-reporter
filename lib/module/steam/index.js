const superagent = require('superagent')
const config = require('config').get('steam')

class Steam {
  checkAppOwnership (applicationId, steamId) {
    return superagent.get(`https://partner.steam-api.com/ISteamUser/CheckAppOwnership/v2/?key=${config.apikey}&steamid=${steamId}&appid=${applicationId}`)
      .then((response) => {
        return response.body.appownership?.ownsapp == true
      })
  }

  doesUserReviewed (applicationId, steamId) {
    let url = `https://steamcommunity.com/profiles/${steamId}/recommended/${applicationId}`

    return superagent.get(url)
      .redirects(0)
      .then((response) => {
        return {
          state: response.status < 300, url
        }
      })
  }
}

module.exports = new Steam()
