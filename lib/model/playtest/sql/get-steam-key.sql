-- ? : project_id
-- ? : id
SELECT value
FROM steam_key
WHERE
      project_id = ?
  AND id = ?
LIMIT 1;
