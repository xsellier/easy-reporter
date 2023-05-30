-- ? : name
SELECT *
FROM invitation
WHERE
  name = ?
LIMIT 1;
