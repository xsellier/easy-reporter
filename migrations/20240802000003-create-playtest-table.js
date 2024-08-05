exports.up = function (db) {
  return Promise.resolve()
    .then(() => db.runSql(`CREATE TABLE "playtest" (
  "project_id"  INTEGER NOT NULL UNIQUE,
  "enabled" BOOLEAN NOT NULL DEFAULT FALSE,
  "discord_channel_id"  TEXT NOT NULL UNIQUE,
  "message" TEXT NOT NULL,
  "form_url" TEXT NOT NULL,
  FOREIGN KEY("project_id") REFERENCES "project"("id") ON DELETE CASCADE,
  PRIMARY KEY("project_id")
);`))
    .then(() => db.runSql(`CREATE TABLE "steam_key" (
  "project_id"  INTEGER NOT NULL,
  "id"  INTEGER NOT NULL UNIQUE,
  "value"  TEXT NOT NULL UNIQUE,
  FOREIGN KEY("project_id") REFERENCES "project"("id") ON DELETE CASCADE,
  PRIMARY KEY("id" AUTOINCREMENT)
);`)).then(() => db.runSql(`CREATE TABLE "playtest_user" (
  "project_id"  INTEGER NOT NULL,
  "discord_user_id"  TEXT NOT NULL,
  "steam_key_id"  INTEGER UNIQUE,
  "registered"  BOOLEAN NOT NULL DEFAULT FALSE,
  "steam_account_id"  TEXT,
  "present"  BOOLEAN NOT NULL DEFAULT FALSE,
  "discord_account_creation_date"  datetime NOT NULL,
  "discord_server_join_date"  datetime NOT NULL,
  "last_update_date"  datetime NOT NULL,
  "discord_user_username"  TEXT,
  "steam_key_reception_date"  datetime,
  "feedback_received"  BOOLEAN NOT NULL DEFAULT 'FALSE',
  PRIMARY KEY("discord_user_id","project_id"),
  FOREIGN KEY("project_id") REFERENCES "project"("id") ON DELETE CASCADE,
  FOREIGN KEY("steam_key_id") REFERENCES "steam_key"("id") ON DELETE CASCADE
);`))
}

exports.down = function (db) {
  return Promise.resolve()
    .then(() => db.dropTable('playtest'))
    .then(() => db.dropTable('steam_key'))
    .then(() => db.dropTable('playtest_user'))
}
