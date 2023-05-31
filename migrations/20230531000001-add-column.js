exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('project', 'archived', {
        type: 'boolean',
        defaultValue: false
      })
    })
    .then(() => {
      return db.addColumn('report', 'legit', {
        type: 'boolean',
        defaultValue: false
      })
    })
    .then(() => {
      return db.addColumn('user', 'banned', {
        type: 'boolean',
        defaultValue: false
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('project'))
}
