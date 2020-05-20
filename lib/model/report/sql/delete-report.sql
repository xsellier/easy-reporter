-- ? : The id of the account to delete
UPDATE report
SET deleted_at = DateTime('now')
WHERE filename = ?;
