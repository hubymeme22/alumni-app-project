<?php

include('./api_class.php');

// parameters: firstname, middlename, lastname, gender, batch, course_id??, email
// avatar, status = 0 (default not verified), date_created, fb_link, twitter, linkedin, github
$email = $_POST['email'];
$password = $_POST['password'];

$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$lastname = $_POST['lastname'];
$gender = $_POST['gender'];
$batch = $_POST['batch'];
$course_id = $_POST['course_id'];

$facebook = $_POST['fb_link'];
$twitter = $_POST['twitter_link'];
$linkedin = $_POST['linkedin_link'];
$github = $_POST['github_link'];

$avatar_fname = $_POST['avatar'];

header('Content-Type: application/json');

// tries to register the account
$response = registerUser($email, $password, $firstname, $middlename, $lastname, $gender, $batch, $course_id, $facebook, $twitter, $linkedin, $github, $avatar_fname);
if (!$response) {
    http_response_code(409);
} else {
    http_response_code(201);
}

// returns the response in json format
echo json_encode(array('created' => $response));

?>