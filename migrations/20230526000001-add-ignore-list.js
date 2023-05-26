exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('report', 'cracked', {
        type: 'boolean',
        defaultValue: 0
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('report'))
}
