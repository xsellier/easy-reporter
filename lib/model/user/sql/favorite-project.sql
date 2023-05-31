-- ? : project_id
-- ? : id
UPDATE user
SET project_id = ?
WHERE id = ?;
