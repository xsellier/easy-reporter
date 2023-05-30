-- ? : owner
SELECT *
FROM invitation
WHERE
      owner = ?
  AND project_id = ?
  __CONSUMED_CONDITION__
ORDER BY created_at DESC
LIMIT ? OFFSET ?;
