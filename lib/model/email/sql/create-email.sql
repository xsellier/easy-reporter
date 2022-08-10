-- ? : application name
-- ? : bug name
-- ? : version name
INSERT INTO email (name, title, version)
VALUES (?, ?, ?)
ON CONFLICT (name, title, version) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    version = EXCLUDED.version;
