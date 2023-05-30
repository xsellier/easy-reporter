exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`ALTER TABLE "account" RENAME TO user;`))
}

exports.down = function (db) {
  return Promise.resolve()
}
