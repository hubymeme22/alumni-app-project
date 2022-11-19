<?php

include ('./api_class.php');

$username = $_POST['username'];
$password = filter_var($_POST['password'], FILTER_SANITIZE_ADD_SLASHES);

$response = $sessionHandler->login($username, $password);
header('Content-Type: application/json');
if ($response['token'] == 'null' || $response['token'] == 'not_allowed')
	http_response_code(401);

echo json_encode($response);

?>