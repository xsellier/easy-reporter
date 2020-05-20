-- ? : filename
-- ? : value
UPDATE report
SET uploaded = ?
WHERE filename = ?;