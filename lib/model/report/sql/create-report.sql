-- ? : filename
-- ? : debug
-- ? : platform
-- ? : version
INSERT INTO report (created_at, filename, debug, platform, version)
VALUES (DateTime('now'), ?, ?, ?, ?);
