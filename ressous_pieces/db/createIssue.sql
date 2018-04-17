INSERT INTO issues_rp (title, description, workspace_id, user_id) VALUES ($1, $2, $3, $4);
SELECT * FROM issues_rp WHERE workspace_id = $3;