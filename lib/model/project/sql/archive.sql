-- ? : project archive
-- ? : project id
UPDATE project
  SET archived = ?
  WHERE id = ?;
