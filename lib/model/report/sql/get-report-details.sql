-- ? : filename
SELECT report.filename, report.title, report.version, bug.fixed, report.cracked
FROM report
LEFT JOIN bug ON
      bug.name = report.name
  AND bug.title = report.title
  AND bug.version = report.version
WHERE
  filename = ?
LIMIT 1;
