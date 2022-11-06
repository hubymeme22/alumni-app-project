<?php

/*
* TimedSession contains functions created for generating a "dynamic token" that must be changed
* every n-seconds. The client is FORCED to change the token every n-seconds to generate a new token.
*
* The purpose of this is to prevent attacks similar to cookie stealing where attackers steals cookie
* for hijacking sessions.
*
* By: Hubert F. Espinola I
*/

// connect to the database session
$timed_sess_db = new mysqli('localhost', 'db_user', 'mysqlpassword%2020', 'timed_session');
$user_database = new mysqli('localhost', 'db_user', 'mysqlpassword%2020', 'alumni_db');

// max and min time before updating the node
$MAX_TIME_INTERVAL = 60;
$MIN_TIME_INTERVAL = 10;

// salt that will be used throughout the hash checking
$SALT = 'jeezRickSanchez';

////////////////////////
//  HELPER FUNCTIONS  //
////////////////////////
// gets all the list of ids from the database
function checkID($id) {
	global $timed_sess_db;
	$query = $timed_sess_db->query("SELECT id from session_data WHERE id='$id';");
	return ($query->num_rows >= 1);
}

// gets all the rows
function retrieveAllData() {
	global $timed_sess_db;
	$query = $timed_sess_db->query("SELECT * FROM session_data;");

	$arr = array();
	while ($result = $query->fetch_row()) {
		$arr[] = $result;
	}

	return $arr;
}

// clear rows that has expired sessions
function clearExpired() {
	global $timed_sess_db;
	global $MAX_TIME_INTERVAL;

	$db_data = retrieveAllData();
	$expired_id_list = array();

	foreach($db_data as $arr) {
		if (time() > ($arr[5] + $MAX_TIME_INTERVAL))
			$expired_id_list[] = $arr[0];
	}

	foreach($expired_id_list as $expired_index) {
		$timed_sess_db->query("DELETE FROM session_data WHERE id='$expired_index';");
	}
}


/////////////////////////
//  SESSION FUNCTIONS  //
/////////////////////////
// adds a new session to the table
function addNewSessionDB($user, $pass) {
	global $timed_sess_db;
	global $user_database;
	global $SALT;

	// generates a new random unique id
	$old_id = rand();
	while (checkID($old_id)) {
		$old_id = rand();
	}

	$current_epoch = time();
	$current_token = hash_hmac('sha256', "$user$pass$old_id$current_epoch", $SALT);

	$user_type = $user_database->query("SELECT type from users WHERE username='$user' AND password='$pass';");
	$user_type = $user_type->fetch_array()[0];
	$inserted = $timed_sess_db->query("INSERT INTO session_data (id, new_id, user, pass, token, epoch_created, type) VALUES ('$old_id', '$old_id', '$user', '$pass', '$current_token', '$current_epoch', '$user_type')");

	if ($inserted)
		return array('token' => $current_token, 'id'=> $old_id);
	return null;
}

// validates this token
function validateToken($old_id, $new_id, $token) {
	global $timed_sess_db;

	clearExpired();
	$query = $timed_sess_db->query("SELECT * FROM session_data WHERE id='$old_id' AND type='1';");
	$result = $query->fetch_row();

	if ($query->num_rows < 1) return false;
	if (($new_id == $result[1]) && ($result[4] == $token)) return true;
	return false;
}

// updates current token
function updateToken($old_id, $new_id, $token) {
	global $timed_sess_db;
	global $MAX_TIME_INTERVAL;
	global $MIN_TIME_INTERVAL;
	global $SALT;

	$status = array();

	clearExpired();
	$query = $timed_sess_db->query("SELECT * FROM session_data WHERE new_id='$new_id' AND id='$old_id';");
	$result = $query->fetch_row();
	header('Content-type: application/json');

	if ($query->num_rows < 1)
		$status['token'] = 'expired';

	$expected_time = (int)($result[5] + $MAX_TIME_INTERVAL);
	$minimum_time = (int)($result[5] + $MIN_TIME_INTERVAL);
	$current_time = (int)time();


	if ($current_time <= $minimum_time)
		$status['update_status'] = 'too_early';

	// if the time does not exceed the expected time
	// only allows the update.
	if ($current_time <= $expected_time && $current_time > $minimum_time) {
		$old_id = $result[0];
		$new_id = $result[1] + 1;
		$user = $result[2];
		$pass = $result[3];
		$token = $result[4];
		$current_epoch = time();

		$new_token = hash_hmac('sha256', "$user$pass$old_id$current_epoch$token", $SALT);
		$timed_sess_db->query("UPDATE session_data SET new_id='$new_id', token='$new_token', epoch_created='$current_epoch';");

		$status['new_token'] = $new_token;
		$status['update_status'] = 'updated';
	} else {
		$status['token'] = 'expired';
	}

	return $status;
}

// creates a new session token
function createSession($user, $pass) {
	return addNewSessionDB($user, $pass);
}

?>