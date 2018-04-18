DELETE FROM practices_rp WHERE practice_id = $1;
SELECT * FROM practices_rp WHERE issue_id = $2;