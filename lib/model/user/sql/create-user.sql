-- ? : password
-- ? : hashed password
-- ? : 1 for admin, 0 otherwise
INSERT INTO user (created_at, username, hashed_password, type)
VALUES (DateTime('now'), ?, ?, ?);
