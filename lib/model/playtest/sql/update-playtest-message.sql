-- ? : message
-- ? : project_id
UPDATE playtest
SET message = ?
WHERE
    project_id = ?;
