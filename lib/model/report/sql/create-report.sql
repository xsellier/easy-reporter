-- ? : name
-- ? : filename
-- ? : debug
-- ? : platform
-- ? : version
-- ? : title
-- ? : manual
INSERT INTO report (name, created_at, filename, debug, platform, version, title, manual)
VALUES (?, DateTime('now'), ?, ?, ?, ?, ?, ?);
