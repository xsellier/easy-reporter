-- $1 : The id of the account to delete
WITH deleted_account_credentials AS (
  DELETE FROM account
  WHERE username = $1
  RETURNING *
),
SELECT *
  FROM account
  WHERE username = $1
  LIMIT 1;