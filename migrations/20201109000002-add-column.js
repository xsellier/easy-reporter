exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('bug', 'name', {
        type: 'string',
        defaultValue: 'Unknown application',
        primaryKey: true
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('bug'))
}
