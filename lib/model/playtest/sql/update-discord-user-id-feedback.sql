-- ? : feedback_received
-- ? : project_id
-- ? : discord_channel_id
UPDATE playtest_user
SET feedback_received = ?
WHERE
      project_id = ?
  AND discord_user_id = ?;
