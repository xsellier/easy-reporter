-- ? : project id
-- ? : project name
-- ? : secret
-- ? : email
INSERT INTO project (steam_id, name, secret, email, created_at)
VALUES (?, ?, ?, ?, DateTime('now'));

