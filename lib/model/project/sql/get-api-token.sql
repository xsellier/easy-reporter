-- ? : steam id
SELECT api_token FROM project
  WHERE steam_id = ?
  LIMIT 1;
