-- $1 : name
-- $2 : cracked
INSERT INTO version (name, cracked)
VALUES ($1, $2)
ON CONFLICT (name) DO UPDATE SET
    name = EXCLUDED.name,
    cracked = EXCLUDED.cracked;