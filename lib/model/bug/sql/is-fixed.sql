-- ? : version
-- ? : bug title
SELECT fixed
FROM bug
WHERE title = ? AND version = ?
LIMIT 1;
