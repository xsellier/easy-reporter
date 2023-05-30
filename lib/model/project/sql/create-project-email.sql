-- ? : project id
-- ? : project name
-- ? : secret
-- ? : api token
-- ? : email
INSERT INTO project (steam_id, name, secret, api_token, email, created_at)
VALUES (?, ?, ?, ?, ?, DateTime('now'));

