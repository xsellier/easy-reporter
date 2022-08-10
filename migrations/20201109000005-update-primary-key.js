exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`CREATE TABLE "version2" (
  "name"  VARCHAR,
  "cracked"  BOOLEAN,
  "application_name"  VARCHAR DEFAULT "Unknown application",
  PRIMARY KEY("application_name", "name")
);
INSERT INTO version2 (name, cracked, application_name)
   SELECT name, cracked, application_name FROM version;
DROP TABLE version;
ALTER TABLE version2 RENAME TO version;`))
    .then(() => db.runSql(`CREATE TABLE "email2" (
  "title"  VARCHAR,
  "version"  VARCHAR,
  "name"  VARCHAR DEFAULT "Unknown application",
  PRIMARY KEY("name","title","version")
);
INSERT INTO email2 (title, version, name)
   SELECT title, version, name FROM email;
DROP TABLE email;
ALTER TABLE email2 RENAME TO email;`))
    .then(() => db.runSql(`CREATE TABLE "bug2" (
  "title"  VARCHAR,
  "version"  VARCHAR,
  "fixed"  BOOLEAN,
  "name"  VARCHAR DEFAULT "Unknown application",
  PRIMARY KEY("name","title","version")
);
INSERT INTO bug2 (title, version, fixed, name)
   SELECT title, version, fixed, name FROM bug;
DROP TABLE bug;
ALTER TABLE bug2 RENAME TO bug;`))
}

exports.down = function (db) {
  return Promise.resolve()
}
