exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('report', 'manual', {
        type: 'boolean',
        defaultValue: 0
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('report'))
}
