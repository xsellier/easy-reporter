-- ? : The id of the account to delete
WITH deleted_account_credentials AS (
  DELETE FROM account
  WHERE username = ?
  RETURNING *
),
SELECT *
  FROM account
  WHERE username = ?
  LIMIT 1;