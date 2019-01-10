-- $1 : filename
-- $2 : value
UPDATE report
SET important = $2
WHERE filename = $1;