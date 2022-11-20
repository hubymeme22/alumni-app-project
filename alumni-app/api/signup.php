<?php

include ('./api_class.php');

$username = $_POST['username'];
$email = $_POST['email'];
$password = filter_var($_POST['password'], FILTER_SANITIZE_ADD_SLASHES);

$response = signup($username, $email, $password);

header('Content-Type: application/json');
echo json_encode($response);

?>