-- ? : filename
-- ? : value
UPDATE report
SET cracked = ?
WHERE filename = ?;
