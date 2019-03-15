-- $1 : version
SELECT cracked
FROM version
WHERE name = $1
LIMIT 1;
