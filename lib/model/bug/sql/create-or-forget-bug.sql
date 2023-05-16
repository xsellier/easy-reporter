-- ? : application name
-- ? : version name
-- ? : bug name
-- ? : fixed
INSERT INTO bug (name, title, version, fixed)
VALUES (?, ?, ?, ?)
ON CONFLICT DO NOTHING;