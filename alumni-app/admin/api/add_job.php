<?php

include ('./api_admin_class.php');


header('Content-type: application/json');
$old_id = $_POST['old_id'];
$new_id = $_POST['new_id'];
$token = $_COOKIE['token'];

$company = $_POST['company'];
$header = $_POST['header'];
$address = $_POST['address'];
$md_content = $_POST['md_content'];

if (!validateToken($old_id, $new_id, $token)) {
    http_response_code(403);
    echo json_encode(array('added' => false, 'valid_token' => false));
    exit();
}

if (addJob($company, $header, $address, $md_content)) {
    echo json_encode(array('added' => true, 'valid_token' => true));
} else {
    http_response_code(403);
    echo json_encode(array('added' => false, 'valid_token' => true));
}

?>