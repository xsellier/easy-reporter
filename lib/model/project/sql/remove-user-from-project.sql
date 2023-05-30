-- ? : project_id
-- ? : user_id
DELETE FROM project_user
WHERE project_id = ?
  AND user_id = ?;
