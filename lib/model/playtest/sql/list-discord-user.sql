-- ? : project id
SELECT playtest_user.*, steam_key.value as steam_key
FROM playtest_user
LEFT OUTER JOIN steam_key ON
      playtest_user.steam_key_id = steam_key.id
WHERE
      playtest_user.project_id = ?
ORDER BY playtest_user.discord_user_id DESC;
