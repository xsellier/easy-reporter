-- ? : registered
-- ? : project_id
-- ? : discord_channel_id
UPDATE playtest_user
SET registered = ?
WHERE
      project_id = ?
  AND discord_user_id = ?;
