-- ? : filename
-- ? : value
UPDATE report
SET important = ?
WHERE filename = ?;