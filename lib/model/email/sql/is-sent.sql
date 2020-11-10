-- ? : application name
-- ? : bug title
-- ? : version
SELECT 1
FROM email
WHERE name = ? AND title = ? AND version = ?
LIMIT 1;
