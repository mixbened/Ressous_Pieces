DELETE FROM projects_rp WHERE projects_id = $1;
SELECT * FROM projects_rp WHERE workspace_id = $2;