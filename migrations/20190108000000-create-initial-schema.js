exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.createTable('account', {
        id: {
          type: 'int',
          primaryKey: true,
          autoIncrement: true
        },
        hashed_password: { type: 'string' },
        created_at: { type: 'datetime' }
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('account'))
}
