-- ? : application name
SELECT COUNT(DISTINCT title) as count
FROM bug
WHERE
      name = ?
      __FIXED_CONDITION__
      __VERSION_CONDITION__;
