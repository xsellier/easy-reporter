SELECT COUNT(*) as numberOfReports, strftime('%m', created_at) as Month
FROM report
WHERE
  created_at BETWEEN datetime('now', '-1 year') AND datetime('now', 'localtime')
GROUP BY
  strftime('%m', created_at)
ORDER BY created_at DESC;
