<?php

include ('./api_admin_class.php');


header('Content-type: application/json');
$id = $_POST['id'];
$old_id = $_POST['old_id'];
$new_id = $_POST['new_id'];
$token = $_COOKIE['token'];

if (!validateToken($old_id, $new_id, $token)) {
    http_response_code(403);
    echo json_encode(array('hold' => false, 'valid_token' => false));
    exit();
}

if (holdAccount($id)) {
    echo json_encode(array('hold' => true, 'valid_token' => true));
} else {
    http_response_code(403);
    echo json_encode(array('hold' => false, 'valid_token' => true));
}

?>