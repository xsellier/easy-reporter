-- ? : application name
-- ? : debug
-- ? : uploaded
-- ? : fixed
-- ? : limit
-- ? : page
SELECT 
  report.*
FROM report
LEFT OUTER JOIN bug ON
      report.name = bug.name
  AND report.title = bug.title
  AND report.version = bug.version
WHERE
      report.name = ?
  AND report.debug = ?
  AND report.uploaded = ?
  AND (   bug.fixed IS__FIXED__ NULL
       OR bug.fixed = ?
      )
  AND report.deleted_at IS__DELETED__ NULL
ORDER BY created_at DESC
LIMIT ? OFFSET ?;
