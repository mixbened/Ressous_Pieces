/* Importing 1: issue_id from Issue thats being forked, 2: workspace_id that it should be placed in, 3: user_id */
INSERT INTO issues_rp (title, description, workspace_id, user_id, check_field)
VALUES (
    (SELECT title from issues_rp WHERE issue_id = $1),
    (SELECT description from issues_rp WHERE issue_id = $1),
    $2, 
    $3,
    false
);
CREATE TABLE temp_pr AS SELECT * FROM practices_rp WHERE issue_id = $1;
ALTER TABLE temp_pr DROP COLUMN practice_id;
UPDATE temp_pr SET issue_id = (SELECT max(issue_id) FROM issues_rp);
UPDATE temp_pr SET user_id = $3;
INSERT INTO practices_rp (title, url, origin, workspace_id, issue_id, user_id) SELECT * FROM temp_pr;
DROP TABLE temp_pr;

CREATE TABLE temp_art AS SELECT * FROM articles_issues_rp WHERE issue_id = $1;
ALTER TABLE temp_art DROP COLUMN article_id;
UPDATE temp_art SET issue_id = (SELECT max(issue_id) FROM issues_rp);
UPDATE temp_art SET user_id = $3;
INSERT INTO articles_issues_rp (title, url, origin, issue_id, user_id) SELECT * FROM temp_art;
DROP TABLE temp_art;