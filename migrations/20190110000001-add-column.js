exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.addColumn('report', 'debug', {
        type: 'boolean',
        defaultValue: false
      })
    })
    .then(() => {
      return db.addColumn('report', 'version', {
        type: 'string',
        notNull: 'true',
        defaultValue: 'unknown'
      })
    })
    .then(() => {
      return db.addColumn('report', 'platform', {
        type: 'string',
        notNull: 'true',
        defaultValue: 'unknown'
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('report'))
}
