-- ? : form_url
-- ? : project_id
UPDATE playtest
SET form_url = ?
WHERE
    project_id = ?;
