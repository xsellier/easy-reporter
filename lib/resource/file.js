const API_VERSION = '/api/2'
const request = require('request')
const path = require('path')

// x-throttle-wait-seconds=7,
const MAX_POLL_INTERVAL = 30720

function normPath (path) {
  if (!path.startsWith('/')) {
    path = `/${path}`
  }

  return path
}

function encodePath (path) {
  return normPath(path).split('/').map(encodeURIComponent).join('/')
}

function tryMkdirInit (context, directory) {
  context.mkdir('reports', (err, json) => {
    if (err) {
      console.log(`Failed to create directory ${err}`)
      process.nextTick(tryMkdirInit.bind(null, context, directory))
    } else {
      console.log('Directory has been created')
    }
  })
}

class ResourceFile {
  constructor (rawOptions) {
    rawOptions = rawOptions || {}

    if (!rawOptions.token || !rawOptions.secret) {
      throw new Error('username and password required for basic auth')
    }

    this.options = {
      auth: {
        user: rawOptions.token,
        pass: rawOptions.secret,
        sendImmediately: true
      },
      baseUrl: rawOptions.host,
      timeout: rawOptions.timeout || 30000,
      pool: rawOptions.pool || { maxSockets: 4 }
    }
    this.request = request.defaults(this.options)

    tryMkdirInit(this, 'reports')
  }

  requestJSON (options, callback) {
    console.debug(`${options.method}: ${options.uri}`)

    return this.request(options, (err, response, body) => {
      if (err) {
        return callback(err)
      }

      console.debug(`${options.method}: ${options.uri}, ` +
                   `${response.statusCode}: ${response.statusMessage}`)
      if (response.statusCode == 429) {
        // Throttled.
        let time = 1000
        const header = response.headers['x-throttle-wait-seconds']
        if (header) {
          time = parseInt(header) * 1000
        }
        console.warn(`API throttled retry in: ${time}ms`)
        setTimeout(this.requestJSON.bind(this), time, options, callback)
        return
      } else if (response.statusCode < 199 || response.statusCode > 300) {
        const err = Error(
          `request: ${JSON.stringify(options)} returned non 2XX: ${response.statusCode}`)
        err.statusCode = response.statusCode
        err.statusMessage = response.statusMessage
        err.options = options
        return callback(err, response, body)
      }

      try {
        return callback(null, response, JSON.parse(body))
      } catch (err) {
        return callback(err, response, body)
      }
    })
  }

  requestOper (options, callback) {
    return this.requestJSON(options, (err, response, json) => {
      const self = this

      if (err) {
        return callback(err)
      }

      let pollInterval = 256
      let pollOptions = {
        method: 'GET',
        uri: `${API_VERSION}/task/${json.uuid}/`
      }

      function poll () {
        self.requestJSON(pollOptions, (err, response, json) => {
          if (err) {
            return callback(err)
          }

          if (!json.result) {
            let err = new Error(`Invalid response: ${JSON.stringify(json)}`)
            return callback(err)
          } else if (json.result.status == 'PENDING' ||
                     json.result.status == 'PROGRESS') {
            // Increase interval for each check up to max interval.
            // TODO: the max interval could be an option.
            pollInterval = Math.min(pollInterval + 128, MAX_POLL_INTERVAL)
            console.warn(`Operation incomplete, re-polling in ${pollInterval}ms`)
            setTimeout(poll, pollInterval)
          } else if (json.result.status == 'FAILURE') {
            let err = new Error(`task failed: ${json.result.result.errors}`)
            return callback(err)
          } else if (json.result.status == 'SUCCESS') {
            return callback(null, response, json)
          }
        })
      }

      setTimeout(poll, pollInterval)
    })
  }

  ping (callback) {
    const options = {
      method: 'GET',
      uri: `${API_VERSION}/ping/`
    }

    this.requestJSON(options, (err, response, json) => {
      callback(err, json)
    })

    return this
  }

  whoami (callback) {
    const options = {
      method: 'GET',
      uri: `${API_VERSION}/whoami/`
    }

    this.requestJSON(options, (err, response, json) => {
      callback(err, json)
    })

    return this
  }

  info (pathname, callback, args) {
    let options = {
      method: 'GET',
      uri: `${API_VERSION}/path/info${encodePath(pathname)}`
    }

    function getInfoPage (client, options, callback, page) {
      if (page) {
        options.qs.page = page
        options.qs.limit = 1024
      }

      // Use an intermediary callback to handle paging.
      client.requestJSON(options, (err, response, json) => {
        if (err) {
          return callback(err)
        }

        // Call callback with a single page of data. If callback returns true,
        // cancel the listing.
        if (callback(err, json.children) === true) {
          return
        }

        // If more pages are available, Call the function recursively to fetch
        // them. Use setImmediate so as not to block the event loop.
        if (json.page < json.pages) {
          console.debug('getting next page of results')
          setImmediate(getInfoPage, client, options, callback, json.page + 1)
        } else if (json.page == json.pages) {
          console.debug('final page of results reached')
          // Send a final callback with null JSON to indicate completion.
          callback(err, null)
        }
      })
    }

    if (args && args.children) {
      // Directory listings may return more than a single item.
      options['qs'] = {
        children: 'true',
        limit: 1024
      }
      options['timeout'] = 30000

      getInfoPage(this, options, callback)
    } else {
      // Handle single-item info as a simpler case.
      this.requestJSON(options, (err, response, json) => {
        callback(err, json)
      })
    }

    return this
  }

  download (pathname, callback) {
    // We don't need to worry about the timeout for downloads since the timeout
    // only applies until the server starts sending the response.
    const options = {
      method: 'GET',
      uri: `${API_VERSION}/path/data${encodePath(pathname)}`
    }

    let body = ''

    // Return the stream to caller.
    return this.request(options)
      .on('data', (chunk) => {
        body += chunk
      })
      .on('end', (e) => {
        if (typeof callback === 'function') {
          callback(e, body)
        }
      })
  }

  upload (pathname, stream, callback) {
    const dirname = path.dirname(pathname)
    const basename = path.basename(pathname)

    const data = {
      file: {
        value: stream,
        options: {
          filename: basename
        }
      }
    }

    const options = {
      method: 'POST',
      uri: `${API_VERSION}/path/data${encodePath(dirname)}`,
      formData: data,
      // Eliminate timeout for uploads.
      timeout: null,
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }

    this.requestJSON(options, (err, response, json) => {
      callback(err, json)
    })
  }

  mkdir (pathname, callback) {
    const options = {
      method: 'POST',
      uri: `${API_VERSION}/path/oper/mkdir/`,
      form: {
        path: normPath(pathname)
      }
    }

    this.requestJSON(options, (err, response, json) => {
      callback(err, json)
    })

    return this
  }

  delete (pathname, callback) {
    const options = {
      method: 'POST',
      uri: `${API_VERSION}/path/oper/remove/`,
      form: {
        path: normPath(pathname)
      }
    }

    this.requestOper(options, (err, response, json) => {
      callback(err, json)
    })

    return this
  }

  copy (src, dst, callback) {
    const options = {
      method: 'POST',
      uri: `${API_VERSION}/path/oper/copy/`,
      form: {
        src: normPath(src),
        dst: normPath(dst)
      }
    }

    this.requestOper(options, (err, response, json) => {
      callback(err, json)
    })

    return this
  }

  move (src, dst, callback) {
    const options = {
      method: 'POST',
      uri: `${API_VERSION}/path/oper/move/`,
      form: {
        src: normPath(src),
        dst: normPath(dst)
      }
    }

    this.requestOper(options, (err, response, json) => {
      callback(err, json)
    })

    return this
  }

  rename (src, dst, callback) {
    const options = {
      method: 'POST',
      uri: `${API_VERSION}/path/oper/rename/`,
      form: {
        src: normPath(src),
        dst: normPath(dst)
      }
    }

    this.requestJSON(options, (err, response, json) => {
      callback(err, json)
    })

    return this
  }
}

module.exports = (options) => Promise.resolve(['file', new ResourceFile(options)])
