exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.createTable('email', {
        title: {
          type: 'string',
          primaryKey: true,
        },
        version: {
          type: 'string',
          primaryKey: true,
        }
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('version'))
}
