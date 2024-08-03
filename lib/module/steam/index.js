const superagent = require('superagent')
const ProjectModel = require('../../model/project')

class Steam {
  checkAppOwnership (applicationId, steamId) {
    return ProjectModel.getApiTokenBySteamId(applicationId)
      .then((apiToken) => {
        return superagent.get(`https://partner.steam-api.com/ISteamUser/CheckAppOwnership/v2/?key=${apiToken}&steamid=${steamId}&appid=${applicationId}`)
      })
      .then((response) => {
        return response.body.appownership?.ownsapp == true
      })
      .catch((error) => {
        console.error(`Cannot check the application ownership ${error}`)
        return false
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
