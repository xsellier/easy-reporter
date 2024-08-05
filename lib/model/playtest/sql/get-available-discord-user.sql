-- ? : project id
-- ? : amount
SELECT *
FROM playtest_user
WHERE
      project_id = ?
  AND steam_key_id IS NULL
ORDER BY discord_user_id DESC
LIMIT ?;
