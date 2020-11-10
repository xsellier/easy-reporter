-- ? : version
-- ? : application name
SELECT cracked
FROM version
WHERE
      name = ?
  AND application_name = ?
LIMIT 1;
