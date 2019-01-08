-- $1 : The id of the account to delete
WITH deleted_account_credentials AS (
  DELETE FROM account
  WHERE id = $1
  RETURNING *
),
SELECT *
  FROM account
  WHERE id = $1
  LIMIT 1;