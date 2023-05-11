-- ? : hashed_password
-- ? : id
UPDATE account
SET hashed_password = ?
WHERE id = ?;
