INSERT INTO practices_rp (title, url, origin, issue_id,workspace_id, user_id) VALUES ($1,$2,$3,$4,$5,$6);
SELECT * FROM practices_rp WHERE issue_id = $4;