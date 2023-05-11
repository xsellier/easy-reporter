-- ? : user id
-- ? : project id
SELECT * FROM project_user
  WHERE user_id == ? AND project_id == ? AND is_admin == 1
  LIMIT 1;
