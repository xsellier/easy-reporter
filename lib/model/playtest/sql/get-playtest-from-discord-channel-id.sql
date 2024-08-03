-- ? : discord_channel_id
SELECT *
FROM playtest
WHERE
      discord_channel_id = ?
LIMIT 1;
