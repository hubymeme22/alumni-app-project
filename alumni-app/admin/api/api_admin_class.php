<?php

include ('./timed_session.php');

// this class is inspired by the concept of JWT for handling sessions
// This one's sum stupid ugly-ass code (will fix soon)
// Created By: Hubert F. Espinola I

// logs in the credentials and authorize if valid
function login($user, $pass) {
	global $conn;
	$query = $conn->query("SELECT * FROM users WHERE username='$user' AND password='$pass' AND type='1' OR email='$user' AND password='$pass' AND type='1'");

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
function getUserProfile($search='') {
	global $conn;
	$query = $conn->query("SELECT * FROM alumnus_bio WHERE first_name LIKE '%$search%' OR last_name LIKE '%$search%';");
	$rows = array();

	while ($rowdata = $query->fetch_row()) {
		$rows[] = $rowdata;
	}

	return $rows;
}

////////////////////////////////////////////////
//  Functions for inserting data on database  //
////////////////////////////////////////////////
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

// adds a new job to the database
function addJob($company, $header, $address, $mdContent) {
	global $conn;

	// the course to be added is valid (does not exist)
	$response = $conn->query("INSERT INTO jobs (company, header, address, md_content) VALUES ('$company', '$header', '$address', '$mdContent');");
	if ($response)
		return true;
	return false;
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

function updateAlumInfo($id, $sex, $batch, $course_id, $email, $employment) {
	global $conn;
	$query = $conn->query("UPDATE alumnus_bio SET employment_status='$employment',email='$email',course_id='$course_id',sex='$sex',batch='$batch' WHERE id='$id';");

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