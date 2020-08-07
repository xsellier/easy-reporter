-- ? : version name
-- ? : bug name
-- ? : fixed
INSERT INTO bug (title, version, fixed)
VALUES (?, ?, ?)
ON CONFLICT (title, version) DO UPDATE SET
    title = EXCLUDED.title,
    version = EXCLUDED.version,
    fixed = EXCLUDED.fixed;