-- $1 : filename
  INSERT INTO report (created_at, filename)
  VALUES (NOW(), $1);