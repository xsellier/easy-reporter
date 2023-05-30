-- ? : The name of the account to retrieve
SELECT * FROM user
  WHERE
      id = ?
  AND (type = 1 OR type = 0)
  LIMIT 1;
