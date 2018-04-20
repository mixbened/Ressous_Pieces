INSERT INTO articles_rp (title, url, origin, issue_id, user_id) VALUES ($1, $2, $3, $4, $5);
SELECT * FROM articles_rp WHERE issue_id = $4;