-- $1 : The id of the account to delete
UPDATE report
SET deleted_at = NOW()
WHERE filename = $1;
