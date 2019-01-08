const fs = require('fs')
const path = require('path')

function loadSync (sqlPath, encoding) {
  const files = fs.readdirSync(sqlPath, encoding)

  return files.reduce((sql, filename) => {
    const filePath = path.join(sqlPath, filename)
    const extname = path.extname(filePath)

    if (fs.statSync(filePath).isFile() &&
        /^\.sql$/i.test(extname)) {
      const basename = path.basename(filename, extname)

      sql[basename] = fs.readFileSync(filePath).toString()
    }

    return sql
  }, {})
}

module.exports = { loadSync }
