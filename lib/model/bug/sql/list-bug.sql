-- ? : application name
SELECT bug.updated_at, bug.title, ignored_bug.ignore as ignored
FROM bug
LEFT JOIN ignored_bug ON
      bug.title = ignored_bug.title
  AND bug.name = ignored_bug.name
WHERE
      bug.name = ?
      __IGNORE_CONDITION__
      __FIXED_CONDITION__
      __VERSION_CONDITION__
GROUP BY bug.title
ORDER BY bug.updated_at DESC
LIMIT ? OFFSET ?;
