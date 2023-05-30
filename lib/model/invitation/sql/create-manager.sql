-- ? : name
-- ? : owner
INSERT INTO invitation (name, owner, created_at, type)
VALUES (?, ?, DateTime('now'), 1);