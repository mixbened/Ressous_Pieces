SELECT workspaces_rp.title as wsTitle, issues_rp.title, issues_rp.issue_id 
FROM issues_rp 
    LEFT JOIN users_rp ON users_rp.user_id = issues_rp.user_id
    LEFT JOIN workspaces_rp ON issues_rp.workspace_id = workspaces_rp.workspace_id
WHERE username = $1 AND check_field = false LIMIT 3;