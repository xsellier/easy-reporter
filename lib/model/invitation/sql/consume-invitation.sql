-- ? : name
-- ? : id
UPDATE invitation
  SET invite = ?
  WHERE name = ?;
