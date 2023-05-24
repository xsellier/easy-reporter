-- ? : application name
-- ? : version name
-- ? : bug name
-- ? : fixed
INSERT INTO bug (name, title, version, fixed, updated_at)
VALUES (?, ?, ?, ?, DateTime('now'))
ON CONFLICT DO NOTHING;