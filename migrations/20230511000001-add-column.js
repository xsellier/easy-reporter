exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('project', 'email', {
        type: 'string'
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('project'))
}
