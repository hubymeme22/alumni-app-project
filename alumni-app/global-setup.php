<?php

// global static values in all php.
// salts, database username and passwords are declared here

// salt to be used for hash hmac
$SALT = 'jeezricksanchez';

$DB_USERNAME = '';
$DB_PASSWORD = '';

// connection for alumni database
$conn = new mysqli('localhost',$DB_USERNAME, $DB_PASSWORD,'alumni_db') or die("Could not connect to mysql".mysqli_error($con));
$timed_sess_db = new mysqli('localhost', $DB_USERNAME, $DB_PASSWORD, 'timed_session');

// max and min time before updating the node
// following digits are in seconds
$MAX_TIME_INTERVAL = 86400;
$MIN_TIME_INTERVAL = 10;


?>