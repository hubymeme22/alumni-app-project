<?php

include ('./api_class.php');

$firstname = sanitizeRawInput($_POST['firstname']);
$lastname = sanitizeRawInput($_POST['lastname']);
$username = sanitizeRawInput($_POST['username']);
$email = sanitizeEmail($_POST['email']);
$password = sanitizeRawInput($_POST['password']);
$sex = sanitizeRawInput($_POST['sex']);
$age = sanitizeRawInput($_POST['age']);
$education = sanitizeRawInput($_POST['education']);
$employment = sanitizeRawInput($_POST['employment']);
$course_id = sanitizeRawInput($_POST['course']);

$response = signup(
    $firstname, $lastname, $username,
    $email, $password, $sex, $age,
    $education, $employment, $course_id
);

header('Content-Type: application/json');
echo json_encode($response);

?>