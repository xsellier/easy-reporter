-- ? : application name
-- ? : version name
-- ? : bug name
-- ? : fixed
INSERT INTO bug (name, title, version, fixed, updated_at)
VALUES (?, ?, ?, ?, DateTime('now'))
ON CONFLICT (name, title, version) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    version = EXCLUDED.version,
    fixed = EXCLUDED.fixed,
    updated_at = EXCLUDED.updated_at;