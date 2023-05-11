-- ? : secret
-- ? : project id
UPDATE project
  SET secret = ?
  WHERE id = ?
  RETURNING secret;
