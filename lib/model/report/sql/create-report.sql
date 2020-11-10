-- ? : name
-- ? : filename
-- ? : debug
-- ? : platform
-- ? : version
-- ? : title
INSERT INTO report (name, created_at, filename, debug, platform, version, title)
VALUES (?, DateTime('now'), ?, ?, ?, ?, ?);
