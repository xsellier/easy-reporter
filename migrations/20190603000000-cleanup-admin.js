exports.up = function (db) {
  return new Promise((resolve, reject) => {
    db.runSql('TRUNCATE TABLE account CASCADE', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

exports.down = function (db) {
  return new Promise((resolve, reject) => {
    db.runSql('TRUNCATE TABLE account', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
