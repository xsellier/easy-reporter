exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`ALTER TABLE user
ADD COLUMN type INT DEFAULT "0";`))
}

exports.down = function (db) {
  return Promise.resolve()
}
