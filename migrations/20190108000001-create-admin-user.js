exports.up = function (db) {
  return new Promise((resolve, reject) => {
    db.insert('account', ['hashed_password'], ['907f64babcc0a7057eae636ee1a732969c709948790a93fc2c85791d660996b9'], (err) => {
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
