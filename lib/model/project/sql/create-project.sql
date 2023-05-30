-- ? : project id
-- ? : project name
-- ? : secret
-- ? : api token
INSERT INTO project (steam_id, name, secret, created_at, api_token)
VALUES (?, ?, ?, DateTime('now'), ?);
