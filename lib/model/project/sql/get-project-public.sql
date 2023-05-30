-- ? : steam id
SELECT id, name, email, steam_id
FROM project
WHERE
  id = ?
LIMIT 1;
