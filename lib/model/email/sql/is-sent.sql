-- ? : version
-- ? : bug title
SELECT 1
FROM email
WHERE title = ? AND version = ?
LIMIT 1;
