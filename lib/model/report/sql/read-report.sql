-- ? : filename
-- ? : value
UPDATE report
SET read = ?
WHERE filename = ?;
