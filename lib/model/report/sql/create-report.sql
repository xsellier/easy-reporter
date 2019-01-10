-- $1 : filename
-- $2 : debug
-- $3 : platform
-- $4 : version
INSERT INTO report (created_at, filename, debug, platform, version)
VALUES (NOW(), $1, $2, $3, $4);
