-- ? : present
-- ? : project_id
UPDATE playtest
SET present = ?
WHERE
    discord_user_id = ?;
