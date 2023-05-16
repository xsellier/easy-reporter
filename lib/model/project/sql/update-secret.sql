-- ? : secret
-- ? : project id
UPDATE project
  SET secret = ?
  WHERE id = ?;
