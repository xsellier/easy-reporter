exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`CREATE TABLE "project" (
      "id"  INTEGER PRIMARY KEY AUTOINCREMENT,
      "secret"  VARCHAR NOT NULL,
      "created_at"  DATETIME,
      "name"  VARCHAR NOT NULL
    );`))
    .then(() => db.runSql(`CREATE TABLE "project_user" (
      "user_id"  INTEGER,
      "project_id"  INTEGER,
      "is_admin"  BOOLEAN,
      PRIMARY KEY("user_id", "project_id")
      CONSTRAINT project_id_fk
        FOREIGN KEY (project_id)
        REFERENCES project(id)
        ON DELETE CASCADE
      CONSTRAINT user_id_fk
        FOREIGN KEY (user_id)
        REFERENCES account(id)
        ON DELETE CASCADE
    );`))
}

exports.down = function (db) {
  return Promise.resolve()
}
