-- ? : user id
SELECT COUNT(project.id) as count
FROM project_user
LEFT OUTER JOIN project ON
      project_user.project_id = project.id
WHERE
      project_user.user_id = ?;
