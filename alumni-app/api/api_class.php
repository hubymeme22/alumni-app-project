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
	$query = $conn->query("SELECT * FROM alumnus_bio WHERE email='$user' AND status='1'");
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

	$query = $conn->query("SELECT * FROM users WHERE username='$email' OR email='$email' AND type='3'");
	$format = array('existing' => false, 'status' => 'not_created');

	// the account already exists
	if ($query->num_rows > 0) {
		$format['existing'] = true;
		return $format;
	}

	// save the account to the database
	$query = $conn->query("INSERT INTO alumnus_bio (first_name, last_name, sex, age, batch, course_id, email, avatar, employment_status, status, facebook_link, twitter_link, linkedin_link, github_link, education) VALUES ('$firstname', '$lastname', '$sex', '$age', '2020', '$course_id', '$email', '', '$employment', '3', '#', '#', '#', '#', '$education');");
	if ($query) $format['status'] = 'created';

	$userList = getAlumni();
	$lastUserID = $userList[count($userList) - 1]['id'];

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
		if ($rowdata[11] != 1)
			continue;

		// retrieve the course from another query
		$course_id = $rowdata[4];
		$course_retrieve = $conn->query("SELECT * FROM courses WHERE id='$course_id'");

		$data = array(
			"id" => $rowdata[0],
			"name" => $rowdata[1],
			"sex" => $rowdata[2],
			"batch" => $rowdata[3],
			"course" => $course_retrieve->fetch_row()[1],
			"email" => $rowdata[5],
			"img" => $rowdata[6],
			"employmentStatus" => $rowdata[7],
			"links" => array(
				"facebook" => $rowdata[10],
				"twitter" => $rowdata[11],
				"linkedin" => $rowdata[12],
				"github" => $rowdata[13]
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