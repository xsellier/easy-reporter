-- ? : project_id
-- ? : id
DELETE FROM steam_key
WHERE
      project_id = ?
  AND id = ?;
