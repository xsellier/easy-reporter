-- ? : enabled
-- ? : project_id
UPDATE playtest
SET enabled = ?
WHERE
    project_id = ?;
