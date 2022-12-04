<?php

include ('./timed_session.php');
include ('./allow-cross-origin.php');

// this class is inspired by the concept of JWT for handling sessions
// This one's sum stupid ugly-ass code (will fix soon)
// Created By: Hubert F. Espinola I

// logs in the credentials and authorize if valid
function login($user, $pass) {
	global $conn;

	$return_format = array('token' => 'null', 'verified' => false, 'existing' => false, 'id' => 0);
	$query = $conn->query("SELECT * FROM users WHERE 
	email='$user' AND password='$pass' AND type='3'
	OR
	username='$user' AND password='$pass' AND type='3'");

	// check if the username and password
	// are existing and valid
	if ($query->num_rows <= 0)
		return $return_format;

	// check if the user is verified
	$alum_id = $query->fetch_row()[6];
	$query = $conn->query("SELECT * FROM alumnus_bio WHERE id='$alum_id' AND status='1'");
	if ($query->num_rows <= 0) {
		$return_format['existing'] = true;
		return $return_format;
	}

	$return_format['existing'] = true;
	$return_format['verified'] = true;

	// generates a valid token and id for this user
	$sessionCreated = createSession($user, $pass);
	$return_format['token'] = $sessionCreated['token'];
	$return_format['id'] = $sessionCreated['id'];
	return $return_format;
}

function signup($firstname, $lastname, $username, $email, $pass, $sex, $age, $education, $employment, $course_id) {
	global $conn;

	$query = $conn->query("SELECT * FROM users WHERE username='$username' AND type='3' OR email='$email' AND type='3'");
	$format = array('existing' => false, 'status' => 'not_created');

	// the account already exists
	if ($query->num_rows > 0) {
		$format['existing'] = true;
		return $format;
	}

	// save the account to the database
	$query = $conn->query("INSERT INTO alumnus_bio (first_name, last_name, sex, age, batch, course_id, email, avatar, employment_status, status, facebook_link, twitter_link, linkedin_link, github_link, education) VALUES ('$firstname', '$lastname', '$sex', '$age', '2020', '$course_id', '$email', '', '$employment', '3', '#', '#', '#', '#', '$education');");
	if ($query) $format['status'] = 'created';

	// retrieves the ID from the last account and use it as reference for users table
	$query = $conn->query("SELECT id FROM alumnus_bio WHERE email='$email'");
	$lastUserID = $query->fetch_row()[0];

	// adds new account from the user
	$query = $conn->query("INSERT INTO users (email, username, password, type, auto_generated_pass, alumnus_id) VALUES ('$email', '$username', '$pass', '3', '', '$lastUserID');");
	if ($query) $format['status'] = 'created';

	return $format;
}

///////////////////////////////////////////////
//  Functions for getting data (client part)  //
///////////////////////////////////////////////
function getEvents() {
	global $conn;
	$query = $conn->query("SELECT * FROM events;");
	$rows = array();

	while ($rowdata = $query->fetch_row()) {
		$rows[] = $rowdata;
	}

	return $rows;
}

// function that will get all the data in the joblist of specific user... returns the array
function getJobList() {
	global $conn;
	$query = $conn->query("SELECT * FROM jobs;");
	$rows = array();

	while ($rowdata = $query->fetch_row()) {
		$data = array(
			"id" => $rowdata[0],
			"header" => $rowdata[1],
			"company" => $rowdata[2],
			"address" => $rowdata[3],
			"md_content" => $rowdata[4]
		);

		$rows[] = $data;
	}

	return $rows;
}

// Get profile data of users in alumni list store in array 
function getAlumni($name_search='') {
	global $conn;
	$query = $conn->query("SELECT * FROM alumnus_bio WHERE first_name LIKE '%$name_search%' OR last_name LIKE '%$name_search%';");
	$rows = array();

	while ($rowdata = $query->fetch_row()) {
		if ($rowdata[9] != 1)
			continue;

		// retrieve the course from another query
		$course_id = $rowdata[5];
		$course_retrieve = $conn->query("SELECT * FROM courses WHERE id='$course_id'");

		$data = array(
			"id" => $rowdata[0],
			"firstName" => $rowdata[1],
			"lastName" => $rowdata[2],
			"name" => "$rowdata[1] $rowdata[2]",
			"sex" => $rowdata[3],
			"batch" => $rowdata[4],
			"course" => $course_retrieve->fetch_row()[1],
			"email" => $rowdata[6],
			"avatar" => $rowdata[7],
			"employmentStatus" => $rowdata[8],
			"links" => array(
				"facebook" => $rowdata[11],
				"twitter" => $rowdata[12],
				"linkedin" => $rowdata[13],
				"github" => $rowdata[14]
			),
		);

		$rows[] = $data;
	}

	return $rows;
}

// function that will get all the data in the joblist of specific user... returns the array
function getCourseList() {
	global $conn;
	$query = $conn->query("SELECT * FROM courses;");
	$rows = array();

	while ($rowdata = $query->fetch_row()) {
		$data = array(
			"id" => $rowdata[0],
			"course_name" => $rowdata[1]
		);

		$rows[] = $data;
	}

	return $rows;
}

// retrieves profile data by the use of token
// as of now this retrieves the same data as the alumni
// but in the future, more private (only user can read)
// information will be retrieved here.
function getProfileData($token) {
	global $timed_sess_db;
	global $conn;

	// manual checking of token and user details
	$format = array('status' => 'invalid_token', 'user_valid' => false, 'data' => array());
	$query = $timed_sess_db->query("SELECT user FROM session_data WHERE token='$token';");

	if ($query->num_rows <= 0)
		return $format;

	$format['status'] = 'ok';
	$useremail = $query->fetch_row()[0];
	$query = $conn->query("SELECT alumnus_id,username FROM users WHERE email='$useremail' OR username='$useremail';");

	if ($query->num_rows <= 0) return $format;
	$format['user_valid'] = true;

	$data = $query->fetch_row();
	$alumID = $data[0]; $alumUsername = $data[1];

	$query = $conn->query("SELECT * FROM alumnus_bio where id='$alumID';");

	// retrieve the course from another query
	$data = $query->fetch_row();
	$course_id = $data[5];
	$course_retrieve = $conn->query("SELECT * FROM courses WHERE id='$course_id'");

	// convert to more readable format
	$format['data'] = array(
		"id" => $data[0],
		"firstName" => $data[1],
		"lastName" => $data[2],
		"name" => "$data[1] $data[2]",
		"sex" => $data[3],
		"batch" => $data[4],
		"course" => $course_retrieve->fetch_row()[1],
		"email" => $data[6],
		"avatar" => $data[7],
		"education" => $data[16],
		"employmentStatus" => $data[8],
		"username" => $alumUsername,
		"links" => array(
			"facebook" => $data[11],
			"twitter" => $data[12],
			"linkedin" => $data[13],
			"github" => $data[14]
		)
	);

	return $format;
}

///////////////////////////
//  Client side updates  //
///////////////////////////
// basic user information update
// simple user info. can be updated for now
// but soon, additional info such as: birthdate
// name, about me, etc. can be updated. (future implementation)
function updateUserInfo($alumID, $username, $fb='#', $tw='#', $ln='#', $gt='#') {
	global $conn;

	$format = array('token' => 'valid', 'update_status' => 'not_updated', 'parameters' => 'correct');
	$query = $conn->query("SELECT * FROM alumnus_bio WHERE id='$alumID';");
	if ($query->num_rows <= 0)
		return $format;

	$query = $conn->query("UPDATE users SET username='$username' WHERE alumnus_id='$alumID'");
	$query = $conn->query("UPDATE alumnus_bio SET facebook_link='$fb', twitter_link='$tw', linkedin_link='$ln', github_link='$gt' WHERE id='$alumID'");
	if ($query) $format['update_status'] = 'updated';

	return $format;
}

/////////////////////////
//  String sanitation  //
/////////////////////////
// sanitize string for different cases
function sanitizeRawInput($input) {
	$input = filter_var($input, FILTER_SANITIZE_ADD_SLASHES);
	// $input = filter_var($input, FILTER_SANITIZE_SPECIAL_CHARS);
	return $input;
}

// sanitize string for email
function sanitizeEmail($input) {
	return filter_var($input, FILTER_SANITIZE_EMAIL);
}

?>