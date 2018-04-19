INSERT INTO users_rp (username, fb_id, imageUrl) VALUES ($1, $2, $3);
SELECT * FROM users_rp WHERE fb_id = $2;