-- ? : project id
-- ? : project name
-- ? : secret
INSERT INTO project (steam_id, name, secret, created_at)
VALUES (?, ?, ?, DateTime('now'));
