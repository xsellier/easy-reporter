const firebase = require('firebase')
const util = require('util')

global.XMLHttpRequest = require('xhr2')

require('firebase/storage')

class ResourceFile {
  constructor (rawOptions) {
    rawOptions = rawOptions || {}
    firebase.initializeApp(rawOptions)

    this.storageRef = firebase.storage().ref()
  }

  ping (callback) {
    callback()

    return this
  }

  whoami (callback) {
    callback()

    return this
  }

  info (filename, callback, args) {
    callback(null, {})

    return this
  }

  download (filename, callback) {
    // Create a reference to the file we want to download
    var fileRef = this.storageRef.child(filename)

    // Get the download URL
    fileRef.getDownloadURL().then(function(url) {
      var xhr = new XMLHttpRequest()

      xhr.responseType = 'blob'
      xhr.onload = function(event) {
        callback(null, xhr.response)
      }

      xhr.open('GET', url)
      xhr.send()
    }).catch(callback)

    return this
  }

  upload (filename, stream, callback) {
    let fileRef = this.storageRef.child(filename)

    fileRef.putString(stream).then((snapshot) => {
      console.log(`${filename} has been uploaded!`)
      callback()
    }).catch(callback)

    return this
  }

  mkdir (filename, callback) {
    // Firebase storage creates directory on the fly
    // There is no need to create directories manually
    callback()

    return this
  }

  delete (filename, callback) {
    let fileRef = this.storageRef.child(filename)

    fileRef.delete().then(callback).catch(callback)

    return this
  }

  copy (src, dst, callback) {
    callback(new Error('Not implemented yet'))

    return this
  }

  move (src, dst, callback) {
    callback(new Error('Not implemented yet'))

    return this
  }

  rename (src, dst, callback) {
    return move(src, dst, callback)
  }
}

module.exports = (options) => Promise.resolve(['file', new ResourceFile(options)])
