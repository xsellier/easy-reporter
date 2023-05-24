-- ? : application name
-- ? : bug title
-- ? : is ignored
INSERT INTO ignored_bug (name, title, ignore)
VALUES (?, ?, ?)
ON CONFLICT (name, title) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    ignore = EXCLUDED.ignore;