-- ? : project_id
-- ? : discord_user_id
-- ? : registered
-- ? : present
-- ? : discord_user_username
-- ? : discord_account_creation_date
-- ? : discord_server_join_date
INSERT INTO playtest_user (project_id, discord_user_id, registered, present, discord_user_username, discord_account_creation_date, discord_server_join_date, last_update_date)
VALUES (?, ?, ?, ?, ?, ?, ?, DateTime('now'))
ON CONFLICT (project_id, discord_user_id) DO UPDATE SET
    registered = EXCLUDED.registered,
    present = EXCLUDED.present,
    discord_user_username = EXCLUDED.discord_user_username,
    discord_account_creation_date = EXCLUDED.discord_account_creation_date,
    discord_server_join_date = EXCLUDED.discord_server_join_date,
    last_update_date = EXCLUDED.last_update_date;
