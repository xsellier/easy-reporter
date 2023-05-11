exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('project', 'steam_id', {
        type: 'int'
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('project'))
}
