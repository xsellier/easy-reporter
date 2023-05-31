-- ? : banned
-- ? : id
UPDATE user
SET banned = ?
WHERE id = ?;
