-- ? : name
-- ? : cracked
INSERT INTO version (name, cracked)
VALUES (?, ?)
ON CONFLICT (name) DO UPDATE SET
    name = EXCLUDED.name,
    cracked = EXCLUDED.cracked;