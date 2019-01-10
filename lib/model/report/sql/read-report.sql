-- $1 : filename
-- $2 : value
UPDATE report
SET read = $2
WHERE filename = $1;
