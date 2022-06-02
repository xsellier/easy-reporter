-- ? : project name
-- ? : secret
-- ? : user_id
WITH created_project AS (
  INSERT INTO project (name, created_at)
  VALUES (?, ?, DateTime('now'))
  RETURNING id, secret
),
INSERT INTO project_user (user_id, project_id, is_admin)
  VALUES (?, created_project.id, 1)
  RETURNING created_project.id, created_project.secret;