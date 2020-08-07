exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('report', 'title', {
        type: 'string'
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('report'))
}
