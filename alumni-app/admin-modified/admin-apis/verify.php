<?php

include('./api_admin_class.php');

// verifies the token from the browser
// checks token value from the cookie (POST REQUEST)
// header('Content-Type: application/json');
if (!isset($_COOKIE['token'])) {
    http_response_code(403);
    echo json_encode(array('validated' => 'non-existent'));
    exit();
}

// retrieves the data passed by the client
$token = $_COOKIE['token'];
$old_id = $_POST['old_id'];
$new_id = $_POST['new_id'];


// validate these data
$isValidated = validateToken($old_id, $new_id, $token);

// change response code if not validated
if (!$isValidated)
    http_response_code(403);

echo json_encode(array('validated' => $isValidated, 'old' => $old_id, 'new' => $new_id, 'token' => $token));

?>