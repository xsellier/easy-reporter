exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('report', 'name', {
        type: 'string',
        defaultValue: 'Unknown application'
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('report'))
}
