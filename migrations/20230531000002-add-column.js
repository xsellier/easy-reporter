exports.up = function (db) {
  return Promise.resolve()
     .then(() => db.runSql(`ALTER TABLE user ADD COLUMN project_id REFERENCES project(id) ON DELETE CASCADE`))
}

exports.down = function (db) {
  return Promise.resolve()
}
