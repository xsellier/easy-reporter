-- ? : owner
SELECT *
FROM invitation
WHERE
  type = 1
  __CONSUMED_CONDITION__
ORDER BY created_at DESC
LIMIT ? OFFSET ?;
