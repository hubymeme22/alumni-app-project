<?php

include ('./timed_session.php');

// this class is inspired by the concept of JWT for handling sessions
// This one's sum stupid ugly-ass code (will fix soon)
// Created By: Hubert F. Espinola I

// logs in the credentials and authorize if valid
function login($user, $pass) {
	global $conn;
	$query = $conn->query("SELECT * FROM users WHERE username='$user' AND password='$pass' AND type='1'");

	// check if the username and password
	// are existing and valid
	if ($query->num_rows <= 0)
		return null;

	// generates a valid token and id for this user
	return createSession($user, $pass);
}

///////////////////////////////////////////////
//  Functions for getting data (admin part)  //
///////////////////////////////////////////////
// retrieves the courses from database
function getCourses() {
	global $conn;
	$query = $conn->query("SELECT * FROM courses;");
	$rows = array();

	while ($rowdata = $query->fetch_row()) {
		$rows[] = $rowdata;
	}

	return $rows;
}

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
function getJobList(){
	global $conn;
	$query = $conn->query("SELECT * FROM jobs;");
	$rows = array();

	while ($rowdata = $query->fetch_row()) {
		$rows[] = $rowdata;
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

////////////////////////////////////////////////
//  Functions for inserting data on database  //
////////////////////////////////////////////////
// registers the given user
function registerUser($email, $password, $first, $middle, $last, $gender, $batch, $course_id, $fb, $tw, $lnkdin, $gthb, $avatar) {
	// register these data to the database (initialize to unverified)
	global $conn;

	// by default, the value of status = 0 (unverified)
	$date_created = date('Y-m-d');

	// checks if the account is already registered
	$query = $conn->query("SELECT * FROM users WHERE username='$email';");
	if ($query->num_rows >= 1)
		return false;

	// adds the account to alumnus list, and credentials to users table
	// autoincrement alumnus_id??? (will try later)
	$query = $conn->query("INSERT INTO alumnus_bio (firstname, middlename, lastname, gender, batch, course_id, email, connected_to, avatar, status, date_created, facebook_link, twitter_link, linkedin_link, github_link) VALUES ('$first', '$middle', '$last', '$gender', '$batch', '$course_id', '$email', '', '$avatar', '0', '$date_created', '$fb', '$tw', '$lnkdin', '$gthb');");
	if ($query) return false;

	$query = $conn->query("INSERT INTO users (name, username, password, type, auto_generated_pass) VALUES ('$first $middle $last', '$email', '$password', '3', '', );");
	if ($query) return false;

	return true;

}

// adds course to the database
function addCourse($course_name) {
	global $conn;

	$query = $conn->query("SELECT * FROM courses WHERE course='$course_name';");
	if ($query->num_rows > 1)
		return false;

	// the course to be added is valid (does not exist)
	$conn->query("INSERT INTO courses (course) VALUES ('$course_name');");
	return true;
}

//////////////////////////////////////////////
//  Functions for editting data on database //
//////////////////////////////////////////////
function updateCourse($id, $courseName) {
	global $conn;
	$query = $conn->query("UPDATE courses SET course='$courseName' WHERE id='$id';");

	if ($query)
		return true;

	return false;
}

function activateAccount($id) {
	global $conn;
	$query = $conn->query("UPDATE alumnus_bio SET status='1' WHERE id='$id';");

	if ($query)
		return true;

	return false;
}

function holdAccount($id) {
	global $conn;
	$query = $conn->query("UPDATE alumnus_bio SET status='2' WHERE id='$id';");

	if ($query)
		return true;

	return false;
}

function deleteCourse($id) {
	global $conn;
	$query = $conn->query("DELETE FROM courses WHERE id='$id'");

	if ($query)
		return true;

	return false;
}

?>