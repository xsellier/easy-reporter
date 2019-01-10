exports.up = function (db) {
  return new Promise((resolve, reject) => {
    db.runSql('TRUNCATE account'), (err) => {
      if (err) {
        reject(err)
      } else {
        db.insert('account', ['hashed_password'], ['ac751c6b7a5c1df76abcb5e59e385fe1c512f3c1680c825b5dec2a6464ca55a4'], (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }
    }
  })
}

exports.down = function (db) {
  return new Promise((resolve, reject) => {
    db.runSql('TRUNCATE account'), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    }
  })
}
