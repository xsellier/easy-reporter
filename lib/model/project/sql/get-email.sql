-- ? : application id
SELECT email FROM project
  WHERE steam_id = ?
  LIMIT 1;
