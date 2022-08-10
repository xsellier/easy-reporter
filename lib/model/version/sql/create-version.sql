-- ? : application name
-- ? : name
-- ? : cracked
INSERT INTO version (application_name, name, cracked)
VALUES (?, ?, ?)
ON CONFLICT (application_name, name) DO UPDATE SET
    application_name = EXCLUDED.application_name,
    name = EXCLUDED.name,
    cracked = EXCLUDED.cracked;