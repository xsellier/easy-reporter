exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`CREATE TABLE "user2" (
  "id"  INTEGER,
  "hashed_password"  VARCHAR,
  "created_at"  datetime,
  "username"  VARCHAR NOT NULL UNIQUE,
  "type"  INT DEFAULT 0,
  PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO user2 (id, hashed_password, created_at, username, type)
   SELECT id, hashed_password, created_at, username, type FROM user;
DROP TABLE user;
ALTER TABLE user2 RENAME TO user;`))
}

exports.down = function (db) {
  return Promise.resolve()
}
