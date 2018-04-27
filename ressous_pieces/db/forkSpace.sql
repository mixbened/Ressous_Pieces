INSERT INTO workspaces_rp (title, description, user_id)
VALUES (
    (SELECT title from workspaces_rp WHERE workspace_id = $1),
    (SELECT description from workspaces_rp WHERE workspace_id = $1), 
    4
);
CREATE TABLE temp_iss AS SELECT * FROM issues_rp WHERE workspace_id = $1;
ALTER TABLE temp_iss DROP COLUMN issue_id;
UPDATE temp_iss SET workspace_id = (SELECT max(workspace_id) FROM workspaces_rp);
UPDATE temp_iss SET user_id = $2;
UPDATE temp_iss SET check_field = false;
INSERT INTO issues_rp (title, description, workspace_id, user_id, check_field) SELECT * FROM temp_iss;
DROP TABLE temp_iss;

