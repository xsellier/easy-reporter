-- ? : present
-- ? : project_id
-- ? : discord_channel_id
UPDATE playtest_user
SET present = ?
WHERE
      project_id = ?
  AND discord_user_id = ?;
