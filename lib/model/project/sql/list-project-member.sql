-- ? : project_id
SELECT account.username, account.id, project_user.is_admin
  FROM project_user
  LEFT JOIN account ON project_user.user_id = account.id
  WHERE project_id = ?;
