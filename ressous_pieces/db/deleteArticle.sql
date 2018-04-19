DELETE FROM articles_rp WHERE article_id = $1;
SELECT * FROM articles_rp WHERE workspace_id = $2;