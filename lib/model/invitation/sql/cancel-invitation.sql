-- ? : name
-- ? : owner
DELETE FROM invitation
WHERE
      name = ?
  AND owner = ?;
