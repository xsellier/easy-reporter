-- $1 : user id
-- $2 : password
WITH inserted_account AS (
  INSERT INTO account (created_at, id, hashed_password)
  VALUES (NOW(), $1, $2)
  RETURNING id
),
SELECT a.id
FROM inserted_account a
LIMIT 1;
