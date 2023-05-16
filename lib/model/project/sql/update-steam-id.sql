-- ? : project steam id
-- ? : project id
UPDATE project
  SET steam_id = ?
  WHERE id = ?;
