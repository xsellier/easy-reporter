-- ? : project_id
SELECT user.username, user.id, project_user.is_admin
  FROM project_user
  LEFT JOIN user ON project_user.user_id = user.id
  WHERE project_id = ?;
