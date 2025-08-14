const superagent = require('superagent')
const ProjectModel = require('../../model/project')

class Steam {

  constructor (rawOptions) {
    this.cronJob = null

    this.startCronJob()
  }

  startCronJob() {
    if (this.cronJob != null) {
      clearTimeout(this.cronJob)
    }

    // 10 minutes (10 * 60 * 1000)
    setTimeout(this.fetchGameData, 10 * 60 * 1000)
  }

  fetchGameData () {
    
  }

  fetchPlayerCount (applicationId) {
    return ProjectModel.getApiTokenBySteamId(applicationId)
      .then((apiToken) => {
        return superagent.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${applicationId}`)
      })
      .then((response) => {
        return response.body.response.player_count
      })
      .catch((error) => {
        console.error(`Cannot get the player count ${error}`)
        return 0
      })
  }

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
