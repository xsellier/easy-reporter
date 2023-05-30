-- ? : project API token
-- ? : project id
UPDATE project
  SET api_token = ?
  WHERE id = ?;
