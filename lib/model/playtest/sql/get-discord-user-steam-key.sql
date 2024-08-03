-- ? : project_id
-- ? : discord_user_id
SELECT playtest_user.discord_user_id, steam_key.value as steam_key
FROM playtest_user
LEFT OUTER JOIN steam_key ON
      steam_key.id = playtest_user.steam_key_id
WHERE
      playtest_user.project_id = ?
  AND playtest_user.discord_user_id = ?
LIMIT 1;
