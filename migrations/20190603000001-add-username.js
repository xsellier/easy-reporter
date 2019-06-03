exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('account', 'username', {
        type: 'string',
        notNull: true,
        unique: true
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('account'))
}
