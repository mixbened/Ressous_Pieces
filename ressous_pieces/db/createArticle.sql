INSERT INTO articles_rp (title, url, origin, workspace_id, issue_id, user_id) VALUES ($1, $2, $3, $4, $5, $6);
SELECT * FROM articles_rp WHERE workspace_id = $4;