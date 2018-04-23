SELECT t1.workspace_id, t1.total, t2.true FROM (SELECT workspaces_rp.workspace_id,count(issues_rp.check_field)as total FROM workspaces_rp JOIN issues_rp
ON workspaces_rp.workspace_id = issues_rp.workspace_id WHERE workspaces_rp.user_id = $1 GROUP BY workspaces_rp.workspace_id) as t1 
LEFT JOIN (SELECT workspace_id,COALESCE(count(*),0) as true FROM issues_rp WHERE check_field = true Group By issues_rp.workspace_id) as t2
ON t1.workspace_id = t2.workspace_id;