-- ? : steam_key_id
-- ? : discord_user_id
-- ? : project_id
-- ? : steam key value
UPDATE playtest_user
SET steam_key_id = ?,
    steam_key_reception_date = DateTime('now')
WHERE
      discord_user_id = ?
  AND project_id = ?
RETURNING ?;
