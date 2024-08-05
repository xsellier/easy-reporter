-- ? : project_id
-- ? : amount
SELECT *
FROM steam_key
LEFT OUTER JOIN playtest_user ON
      playtest_user.project_id = steam_key.project_id
  AND playtest_user.steam_key_id = steam_key.id
WHERE
     steam_key.project_id = ?
 AND playtest_user.discord_user_id IS NULL
LIMIT ?;
