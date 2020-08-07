-- ? : filename
-- ? : debug
-- ? : platform
-- ? : version
--? -- title
INSERT INTO report (created_at, filename, debug, platform, version, title)
VALUES (DateTime('now'), ?, ?, ?, ?, ?);
