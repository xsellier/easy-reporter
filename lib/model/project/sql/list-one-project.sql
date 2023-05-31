-- ? : user id
SELECT 
  project.id, project.name, project.steam_id, project.email, project_user.is_admin, project.created_at, project.archived
FROM project_user
LEFT OUTER JOIN project ON
      project_user.project_id = project.id
WHERE
      project_user.user_id = ?
ORDER BY project.created_at DESC
LIMIT ? OFFSET ?;
