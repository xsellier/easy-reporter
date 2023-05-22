-- ? : application name
-- ? : bug title
SELECT bug.fixed, report.created_at, report.filename, report.version, report.platform, COUNT(report.filename) as number_of_report
FROM bug
LEFT JOIN report ON
      bug.name = report.name
  AND bug.title = report.title
  AND bug.version = report.version
WHERE
      bug.name = ? AND bug.title = ? AND
      report.uploaded = 1 AND report.deleted_at IS NULL
GROUP BY report.platform, report.version
ORDER BY report.created_at DESC;
