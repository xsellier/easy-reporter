-- ? : application name
SELECT COUNT(DISTINCT title)
FROM bug
WHERE
      name = ?
      __FIXED_CONDITION__
      __VERSION_CONDITION__;
