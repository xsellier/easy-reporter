exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('email', 'name', {
        type: 'string',
        defaultValue: 'Unknown application',
        primaryKey: true
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('email'))
}
