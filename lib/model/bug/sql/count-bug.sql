-- ? : application name
SELECT COUNT(DISTINCT bug.title) as count
FROM bug
LEFT JOIN ignored_bug ON
      bug.title = ignored_bug.title
  AND bug.name = ignored_bug.name
WHERE
      bug.name = ?
      __IGNORE_CONDITION__
      __FIXED_CONDITION__
      __VERSION_CONDITION__;
