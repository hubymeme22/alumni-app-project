<?php

include('./api_admin_class.php');

header('Content-type: application/json');
if (isset($_COOKIE['token'])) {
    $old_id = $_POST['old_id'];
    $new_id = $_POST['new_id'];
    $isValidated = validateToken($old_id, $new_id, $_COOKIE['token']);

    if ($isValidated) {
        $courses_data = getEvents();
        echo json_encode(array('status' => 'ok', 'data' => $courses_data, 'size' => count($courses_data)));
    } else {
        echo json_encode(array('status' => 'invalid_token', 'data' => null, 'size' => 0));
    }
} else {
    http_response_code(403);
    echo json_encode(array('status' => 'unknown_token', 'data' => null, 'size' => 0));
}

?>