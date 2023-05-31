-- ? : user_id
DELETE FROM project
WHERE
  id in (  
    SELECT project_id as id
    FROM project_user
    WHERE user_id = ?
  );
