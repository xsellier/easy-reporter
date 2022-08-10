-- ? : project name
-- ? : secret
-- ? : project id
UPDATE project
  SET name = ?, secret = ?
  WHERE project_id = ?
  RETURNING secret;
