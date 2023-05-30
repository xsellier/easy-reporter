-- ? : user id
-- ? : name
SELECT project_user.project_id FROM project
LEFT JOIN project_user ON
  project.id = project_user.project_id
WHERE
      project_user.user_id = ?
  AND project.name = ?
LIMIT 1;