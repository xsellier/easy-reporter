const fs = require('fs')
const path = require('path')
const directories = fs.readdirSync(__dirname)

function loadSync (jsPath) {
  const files = fs.readdirSync(jsPath)

  return files.reduce((js, filename) => {
    const filePath = path.join(jsPath, filename)
    const extname = path.extname(filePath)

    if (fs.statSync(filePath).isFile() && /^\.js$/i.test(extname)) {
      js.push(require(filePath))
    }

    return js
  }, [])
}

const routes = directories
  .map((directory) => path.join(__dirname, directory))
  .filter((filepath) => fs.statSync(filepath).isDirectory())
  .map(loadSync)
  .reduce((acc, routes) => acc.concat(routes), [])

module.exports = routes
