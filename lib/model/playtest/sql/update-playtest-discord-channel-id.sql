-- ? : discord_channel_id
-- ? : project_id
UPDATE playtest
SET discord_channel_id = ?
WHERE
    project_id = ?;
