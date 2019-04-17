const fs = require('fs')
const path = require('path')

function tryMkdirInit(context, directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdir(directory, (err) => {
      if (err) {
        console.log(`Failed to create directory ${err}`)
        process.nextTick(tryMkdirInit.bind(null, context, directory))
      } else {
        console.log('Directory has been created')
      }
    })
  }
}

class ResourceFile {
  constructor (rawOptions) {
    rawOptions = rawOptions || {}

    if (!rawOptions.path) {
      throw new Error('path is required')
    }

    this.options = rawOptions

    tryMkdirInit(this, path.join(this.options.path, 'reports'))
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
    let pathName = path.join(this.options.path, filename)

    fs.readFile(pathName, (err, rawData) => {
      console.error(err)

      callback(err, rawData.toString())
    })

    return this
  }

  upload (filename, stream, callback) {
    let pathName = path.join(this.options.path, filename)

    fs.writeFile(pathName, stream, { flag: 'a+' }, (err) => {
      console.error(err)

      callback(err)
    })

    return this
  }

  mkdir (filename, callback) {
    let pathName = path.join(this.options.path, filename)

    fs.mkdir(pathName, callback)

    return this
  }

  delete (filename, callback) {
    let pathName = path.join(this.options.path, filename)

    fs.unlink(pathName, callback)

    return this
  }

  copy (src, dst, callback) {
    let srcPath = path.join(this.options.path, src)
    let dstPath = path.join(this.options.path, dst)

    fs.copyFile(srcPath, dstPath, callback)

    return this
  }

  move (src, dst, callback) {
    let srcPath = path.join(this.options.path, src)
    let dstPath = path.join(this.options.path, dst)

    fs.rename(srcPath, dstPath, callback)

    return this
  }

  rename (src, dst, callback) {
    return move(src, dst, callback)
  }
}

module.exports = (options) => Promise.resolve(['file', new ResourceFile(options)])
