-- ? : application name
-- ? : bug title
-- ? : version
SELECT fixed
FROM bug
WHERE
  name = ? AND
  title = ? AND
  version = ?
LIMIT 1;
