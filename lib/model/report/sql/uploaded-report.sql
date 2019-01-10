-- $1 : filename
-- $2 : value
UPDATE report
SET uploaded = $2
WHERE filename = $1;