-- ? : project id
SELECT playtest_user.*, steam_key.value as steam_key
FROM playtest_user
INNER JOIN steam_key ON
      playtest_user.steam_key_id = steam_key.id
WHERE
      playtest_user.project_id = ?
  AND playtest_user.feedback_received = 0
  AND playtest_user.steam_key_reception_date <= datetime('now', '-5 minutes')
ORDER BY playtest_user.discord_user_id DESC;
