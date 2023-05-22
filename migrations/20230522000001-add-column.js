exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('bug', 'updated_at', {
        type: 'timestamp'
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('bug'))
}
