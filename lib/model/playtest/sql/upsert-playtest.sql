-- ? : project_id
-- ? : enabled
-- ? : discord_channel_id
-- ? : message
-- ? : form url
INSERT INTO playtest (project_id, enabled, discord_channel_id, message, form_url)
VALUES (?, ?, ?, ?, ?)
ON CONFLICT (project_id) DO UPDATE SET
    enabled = EXCLUDED.enabled,
    discord_channel_id = EXCLUDED.discord_channel_id,
    message = EXCLUDED.message,
    form_url = EXCLUDED.form_url;
