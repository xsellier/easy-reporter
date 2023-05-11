exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('account', 'is_admin', {
        type: 'boolean',
        defaultValue: 0
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('account'))
}
