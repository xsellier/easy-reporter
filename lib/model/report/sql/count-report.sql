-- ? : application name
SELECT COUNT(report.filename) as count
FROM report
LEFT OUTER JOIN bug ON
      report.name = bug.name
  AND report.title = bug.title
  AND report.version = bug.version
WHERE
      report.name = ?
  __DEBUG_CONDITION__
  __UPDLOADED_CONDITION__
  __FIXED_CONDITION__
  __DELETED_AT_CONDITION__
  __MANUAL_CONDITION__
  __VERSION_CONDITION__
  __PLATFORM_CONDITION__
ORDER BY created_at DESC
