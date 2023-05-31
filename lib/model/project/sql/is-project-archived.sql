-- ? : project id
SELECT archived
FROM project
WHERE
  steam_id = ? 
LIMIT 1;
