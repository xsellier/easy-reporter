-- ? : project id
SELECT archived
FROM project
WHERE
  id = ? 
LIMIT 1;
