-- $1 : password
INSERT INTO account (created_at, hashed_password)
VALUES (NOW(), $1);
