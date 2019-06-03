-- $1 : The name of the account to retrieve
SELECT * FROM account
WHERE username = $1;
