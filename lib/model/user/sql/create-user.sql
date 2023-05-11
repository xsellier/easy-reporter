-- ? : password
-- ? : hashed password
-- ? : 1 for admin, 0 otherwise
INSERT INTO account (created_at, username, hashed_password, is_admin)
VALUES (DateTime('now'), ?, ?? );
