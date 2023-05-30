-- ? : hashed_password
-- ? : id
UPDATE user
SET hashed_password = ?
WHERE id = ?;
