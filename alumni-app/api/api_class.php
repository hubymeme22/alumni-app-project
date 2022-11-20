<?php

include ('./timed_session.php');

// this class is inspired by the concept of JWT for handling sessions
// This one's sum stupid ugly-ass code (will fix soon)
// Created By: Hubert F. Espinola I

// logs in the credentials and authorize if valid
function login($user, $pass) {
	global $conn;

	$return_format = array('token' => 'null', 'verified' => false, 'existing' => false, 'id' => 0);
	$query = $conn->query("SELECT * FROM users WHERE username='$user' AND password='$pass' AND type='3'");

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

function signup($user, $email, $pass) {
	global $conn;

	$query = $conn->query("SELECT * FROM users WHERE username='$email' AND type='3'");
	$format = array('existing' => false, 'status' => 'not_created');

	// the account already exists
	if ($query->num_rows > 0) {
		$format['existing'] = true;
		return $format;
	}

	// save the account to the database
	$query = $conn->query("INSERT INTO alumnus_bio (name, sex, batch, course_id, email, avatar, employment_status, status, facebook_link, twitter_link, linkedin_link, github_link) VALUES ('$user', 'Female', '2020', '1', '$email', '', 'Unemployed', '3', '#', '#', '#', '#');");
	if ($query) $format['status'] = 'created';

	$userList = getUserProfile();
	$lastUserID = $userList[count($userList) - 1][0];

	$query = $conn->query("INSERT INTO users (name, username, password, type, auto_generated_pass, alumnus_id) VALUES ('$user', '$email', '$pass', '3', '', '$lastUserID');");
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
function getUserProfile(){
	global $conn;
	$query = $conn->query("SELECT * FROM alumnus_bio;");
	$rows = array();

	while ($rowdata = $query->fetch_row()) {
		$rows[] = $rowdata;
	}

	return $rows;
}

?>