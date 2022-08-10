-- ? : password
-- ? : hashed password
INSERT INTO account (created_at, username, hashed_password)
VALUES (DateTime('now'), ?, ?);
