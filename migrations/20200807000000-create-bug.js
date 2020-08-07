exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.createTable('bug', {
        title: {
          type: 'string',
          primaryKey: true,
        },
        version: {
          type: 'string',
          primaryKey: true,
        },
        fixed: {
          type: 'boolean'
        }
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('version'))
}
