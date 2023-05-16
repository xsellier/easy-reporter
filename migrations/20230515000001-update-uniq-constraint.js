exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`CREATE TABLE "project2" (
      "id"  INTEGER,
      "secret"    VARCHAR NOT NULL,
      "created_at"      DATETIME,
      "name"      VARCHAR NOT NULL UNIQUE,
      "email"     VARCHAR,
      "steam_id"  INTEGER,
      PRIMARY KEY("id" AUTOINCREMENT)
);;
INSERT INTO project2 (id, secret, created_at, name, email, steam_id)
   SELECT id, secret, created_at, name, email, steam_id FROM project;
DROP TABLE project;
ALTER TABLE project2 RENAME TO project;`))
}

exports.down = function (db) {
  return Promise.resolve()
}
