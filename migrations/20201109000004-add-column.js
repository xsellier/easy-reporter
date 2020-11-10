exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('version', 'application_name', {
        type: 'string',
        defaultValue: 'Unknown application',
        primaryKey: true
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('version'))
}
