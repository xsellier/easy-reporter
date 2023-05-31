-- ? : owner
SELECT COUNT(name) as count
FROM invitation
WHERE
  type = 1
  __CONSUMED_CONDITION__
ORDER BY created_at DESC;
