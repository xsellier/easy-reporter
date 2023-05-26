exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('version'))
}

exports.down = function (db) {
  return Promise.resolve()
}
