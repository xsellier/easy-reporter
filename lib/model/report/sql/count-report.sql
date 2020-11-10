-- ? : debug
-- ? : uploaded
-- ? : fixed
SELECT COUNT(report.filename) as count
FROM report
LEFT OUTER JOIN bug ON
      report.title = bug.title
  AND report.version = bug.version
WHERE
      report.debug = ?
  AND report.uploaded = ?
  AND (   bug.fixed IS__FIXED__ NULL
       OR bug.fixed = ?
      )
  AND report.deleted_at IS__DELETED__ NULL
ORDER BY created_at DESC
