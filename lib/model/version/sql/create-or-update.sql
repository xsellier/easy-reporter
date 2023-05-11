-- ? : application name
-- ? : name
-- ? : cracked
INSERT INTO version (application_name, name, cracked)
VALUES (?, ?, ?)
ON CONFLICT (application_name, name) DO NOTHING;
