-- ? : discord_role_id
-- ? : project_id
UPDATE playtest
SET discord_role_id = ?
WHERE
    project_id = ?;
