-- ? : name
-- ? : filename
-- ? : debug
-- ? : platform
-- ? : version
-- ? : title
-- ? : manual
-- ? : cracked
-- ? : legit
INSERT INTO report (name, created_at, filename, debug, platform, version, title, manual, cracked, legit)
VALUES (?, DateTime('now'), ?, ?, ?, ?, ?, ?, ?, ?);
