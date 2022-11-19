<?php

include ('./api_admin_class.php');


header('Content-type: application/json');
$course_name = $_POST['course'];
$old_id = $_POST['old_id'];
$new_id = $_POST['new_id'];
$token = $_COOKIE['token'];

if (!validateToken($old_id, $new_id, $token)) {
    http_response_code(403);
    echo json_encode(array('added' => false, 'valid_token' => false));
    exit();
}

if (addCourse($course_name)) {
    echo json_encode(array('added' => true, 'valid_token' => true));
} else {
    http_response_code(403);
    echo json_encode(array('added' => false, 'valid_token' => true));
}

?>