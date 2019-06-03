-- $1 : password
INSERT INTO account (created_at, username, hashed_password)
VALUES (NOW(), $1, $2);
