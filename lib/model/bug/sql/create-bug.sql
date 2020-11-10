-- ? : application name
-- ? : version name
-- ? : bug name
-- ? : fixed
INSERT INTO bug (name, title, version, fixed)
VALUES (?, ?, ?, ?)
ON CONFLICT (name, title, version) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    version = EXCLUDED.version,
    fixed = EXCLUDED.fixed;