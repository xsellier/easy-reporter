-- ? : owner
SELECT COUNT(name) as count
FROM invitation
WHERE
      owner = ?
  AND project_id = ?
  __CONSUMED_CONDITION__
ORDER BY created_at DESC;
