exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`CREATE TABLE "ignored_bug2" (
  "title" TEXT NOT NULL,
  "name"  TEXT NOT NULL DEFAULT 'Unkown application',
  "ignore"  BOOLEAN,
  PRIMARY KEY("title","name"),
  FOREIGN KEY("name") REFERENCES "project"("name")
);
INSERT INTO ignored_bug2 (title, name, ignore)
   SELECT title, name, ignore FROM ignored_bug;
DROP TABLE ignored_bug;
ALTER TABLE ignored_bug2 RENAME TO ignored_bug;`))
}

exports.down = function (db) {
  return Promise.resolve()
}
