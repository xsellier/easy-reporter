-- ? : other conditions
-- ? : page
SELECT COUNT(*) as count
FROM report
WHERE
  debug = ? AND
  uploaded = ? AND
  deleted_at IS__DELETED__ NULL;
