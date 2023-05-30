exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('project_user', 'created_at', {
        type: 'datetime'
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('project_user'))
}
