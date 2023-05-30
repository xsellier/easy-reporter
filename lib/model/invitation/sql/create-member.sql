-- ? : name
-- ? : owner
-- ? : projectId
INSERT INTO invitation (name, owner, created_at, type, project_id)
VALUES (?, ?, DateTime('now'), 2, ?);