DELETE FROM articles_issues_rp WHERE issue_id = $1;
DELETE FROM practices_rp WHERE issue_id = $1;
DELETE FROM issues_rp WHERE issue_id = $1;
SELECT * FROM issues_rp WHERE workspace_id = $2;