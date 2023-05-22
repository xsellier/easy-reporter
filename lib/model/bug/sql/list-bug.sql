-- ? : application name
SELECT updated_at, title
FROM bug
WHERE
      name = ?
      __FIXED_CONDITION__
      __VERSION_CONDITION__
GROUP BY title
ORDER BY updated_at DESC
LIMIT ? OFFSET ?;
