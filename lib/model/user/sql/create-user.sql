-- $1 : password
WITH inserted_account AS (
  INSERT INTO account (created_at, hashed_password)
  VALUES (NOW(), $1)
  RETURNING id
),
SELECT a.id
FROM inserted_account a
LIMIT 1;
