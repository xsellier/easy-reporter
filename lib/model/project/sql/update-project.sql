-- ? : project name
-- ? : secret
-- ? : project id
UPDATE project
  SET name = ?, secret = ?
  WHERE id = ?
  RETURNING secret;
