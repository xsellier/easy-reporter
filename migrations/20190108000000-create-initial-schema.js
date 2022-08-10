exports.up = function (db) {
  return new Promise((resolve, reject) => {
    db.createTable('account', {
      id: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true
      },
      hashed_password: { type: 'string' },
      created_at: { type: 'datetime' },
      username: {
        type: 'string',
        notNull: true,
        unique: true
      }
    }, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('account'))
}
