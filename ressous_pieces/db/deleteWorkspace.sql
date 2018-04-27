DELETE FROM practices_rp WHERE workspace_id = $1; 
DELETE FROM articles_rp WHERE workspace_id = $1; 
DELETE FROM projects_rp WHERE workspace_id = $1;
DELETE FROM issues_rp WHERE workspace_id = $1;
DELETE FROM workspaces_rp WHERE workspace_id = $1;
SELECT * FROM workspaces_rp;