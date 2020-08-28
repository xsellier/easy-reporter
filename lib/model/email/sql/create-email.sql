-- ? : version name
-- ? : bug name
INSERT INTO email (title, version)
VALUES (?, ?)
ON CONFLICT (title, version) DO UPDATE SET
    title = EXCLUDED.title,
    version = EXCLUDED.version;
