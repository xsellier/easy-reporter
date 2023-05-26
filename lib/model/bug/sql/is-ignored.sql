-- ? : application name
-- ? : bug title
SELECT ignore
FROM ignored_bug
WHERE
  name = ? AND
  title = ?
LIMIT 1;
