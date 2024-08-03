-- ? : project id
SELECT steam_key.id, steam_key.value, playtest_user.discord_user_id as discord_user_id
FROM steam_key
LEFT OUTER JOIN playtest_user ON
      steam_key.id = playtest_user.steam_key_id
WHERE
      steam_key.project_id = ?
ORDER BY steam_key.id DESC;
