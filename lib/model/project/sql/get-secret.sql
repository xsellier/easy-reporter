-- ? : steam id
SELECT secret FROM project
  WHERE steam_id = ?
  LIMIT 1;
