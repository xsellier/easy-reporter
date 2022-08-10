exports.up = function (db) {
  return Promise.resolve()
    .then(() => {
      return db.createTable('report', {
        filename: {
          type: 'string',
          primaryKey: true
        },
        uploaded: {
          type: 'boolean',
          defaultValue: false
        },
        read: {
          type: 'boolean',
          defaultValue: false
        },
        important: {
          type: 'boolean',
          defaultValue: false
        },
        analyzed: {
          type: 'boolean',
          defaultValue: false
        },
        created_at: {
          type: 'timestamp',
          notNull: true
        },
        deleted_at: {
          type: 'timestamp',
        }
      })
    })
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('report'))
}
