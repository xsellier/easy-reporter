-- ? : other conditions
-- ? : page
-- ? : limit
SELECT *
FROM report
WHERE
  debug = ? AND
  uploaded = ? AND
  deleted_at IS__DELETED__ NULL
ORDER BY created_at DESC
LIMIT ? OFFSET ?;
