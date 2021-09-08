-- ? : project_id
-- ? : user_id
-- ? : user_id
WITH deleted_user AS (
  DELETE FROM project_user
  WHERE project_id = ?
    AND user_id = ?
  RETURNING *
),
SELECT project_id
  FROM project_user
  WHERE user_id = ?;
