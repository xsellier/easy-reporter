exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.createTable('version', {
        name: {
          type: 'string',
          primaryKey: true,
        },
        cracked: { type: 'boolean' }
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('version'))
}
