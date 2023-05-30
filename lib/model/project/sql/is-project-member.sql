-- ? : user id
-- ? : project id
SELECT * FROM project_user
  WHERE user_id = ? AND project_id = ?
  LIMIT 1;
