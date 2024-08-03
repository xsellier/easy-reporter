-- ? : project_id
SELECT * FROM project
  WHERE id = ?
  LIMIT 1;
