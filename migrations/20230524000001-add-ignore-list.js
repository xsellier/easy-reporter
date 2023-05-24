exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`CREATE TABLE "ignored_bug" (
  "title" TEXT NOT NULL,
  "name"  TEXT NOT NULL DEFAULT 'Unkown application',
  "ignore"  BOOLEAN,
  FOREIGN KEY("title") REFERENCES "bug"("title"),
  FOREIGN KEY("name") REFERENCES "project"("name"),
  PRIMARY KEY("title","name")
);`))
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('ignored_bug'))
}
