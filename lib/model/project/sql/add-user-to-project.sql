-- ? : user_id
-- ? : project_id
-- ? : is admin
INSERT INTO project_user (user_id, project_id, is_admin)
  VALUES (?, ?, ?);
