INSERT INTO workspaces_rp (title, description, user_id)
VALUES (
    (SELECT title from workspaces_rp WHERE workspace_id = $1),
    (SELECT description from workspaces_rp WHERE workspace_id = $1), 
    $2
);
CREATE TABLE temp_iss AS SELECT * FROM issues_rp WHERE workspace_id = $1;
ALTER TABLE temp_iss DROP COLUMN issue_id;
UPDATE temp_iss SET workspace_id = (SELECT max(workspace_id) FROM workspaces_rp);
UPDATE temp_iss SET user_id = $2;
UPDATE temp_iss SET check_field = false;
INSERT INTO issues_rp (title, description, workspace_id, user_id, check_field) SELECT * FROM temp_iss;

DROP TABLE temp_iss;



CREATE TABLE temp_art AS SELECT * FROM articles_rp WHERE workspace_id = $1;
ALTER TABLE temp_art DROP COLUMN article_id;
UPDATE temp_art SET workspace_id = (SELECT max(workspace_id) FROM workspaces_rp);
UPDATE temp_art SET user_id = $2;
INSERT INTO articles_rp (title, url, origin, workspace_id, issue_id, user_id) SELECT * FROM temp_art;
DROP TABLE temp_art;

CREATE TABLE temp_pro AS SELECT * FROM projects_rp WHERE workspace_id = $1;
ALTER TABLE temp_pro DROP COLUMN projects_id;
UPDATE temp_pro SET workspace_id = (SELECT max(workspace_id) FROM workspaces_rp);
UPDATE temp_pro SET user_id = $2;
INSERT INTO projects_rp (title, url, origin, workspace_id, user_id) SELECT * FROM temp_pro;
DROP TABLE temp_pro;