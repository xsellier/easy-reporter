-- ? : The name of the account to retrieve
SELECT * FROM user
  WHERE
      id = ?
  AND type = 0
  LIMIT 1;
