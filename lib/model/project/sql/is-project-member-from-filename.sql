-- ? : user id
-- ? : name
SELECT report.filename FROM project
LEFT JOIN project_user ON
  project.id = project_user.project_id
LEFT JOIN report ON
  project.name = report.name
WHERE
      project_user.user_id = ?
  AND report.filename = ?
LIMIT 1;
