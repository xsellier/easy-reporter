-- ? : application name
-- ? : bug title
SELECT ignored
FROM ignored_bug
WHERE
  name = ? AND
  title = ?
LIMIT 1;
