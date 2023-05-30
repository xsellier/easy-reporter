exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`CREATE TABLE "invitation" (
  "name"  VARCHAR NOT NULL,
  "owner"  INTEGER NOT NULL,
  "created_at"  DATETIME NOT NULL,
  "invite"  INTEGER,
  "type"  INTEGER,
  "project_id"  INTEGER,
  FOREIGN KEY("owner") REFERENCES "user"("id") ON DELETE CASCADE,
  FOREIGN KEY("invite") REFERENCES "user"("id") ON DELETE CASCADE,
  PRIMARY KEY("name"),
  FOREIGN KEY("project_id") REFERENCES "project"("id") ON DELETE CASCADE
);`))
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('invitation'))
}
