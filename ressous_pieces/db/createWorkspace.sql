INSERT INTO workspaces_rp (title, description, user_id) VALUES ($1, $2, $3);
SELECT * FROM workspaces_rp WHERE user_id = $3;