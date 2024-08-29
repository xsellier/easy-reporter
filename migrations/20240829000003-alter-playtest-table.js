exports.up = function (db) {
  return Promise.resolve()
     .then(() => db.runSql(`ALTER TABLE playtest ADD COLUMN discord_role_id TEXT`))
}

exports.down = function (db) {
  return Promise.resolve()
}
