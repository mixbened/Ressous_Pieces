INSERT INTO issues_rp (title, description, workspace_id, user_id, check_field, editor, editormode) VALUES ($1, $2, $3, $4, false, '', '');
SELECT * FROM issues_rp WHERE workspace_id = $3;