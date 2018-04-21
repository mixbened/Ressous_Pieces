UPDATE issues_rp SET check_field = $2 WHERE issue_id = $1;
SELECT * FROM issues_rp WHERE workspace_id = $3 ORDER BY issue_id ASC;
