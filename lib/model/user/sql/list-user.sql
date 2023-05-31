SELECT id, created_at, username, type, banned
FROM user
ORDER BY created_at DESC
LIMIT ? OFFSET ?;
