-- ? : project email
-- ? : project id
UPDATE project
  SET email = ?
  WHERE id = ?
  RETURNING email;
