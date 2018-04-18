DELETE FROM issues_rp WHERE issue_id = $1;
SELECT * FROM issues_rp WHERE workspace_id = $2;