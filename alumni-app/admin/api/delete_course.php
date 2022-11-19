<?php

include('./api_admin_class.php');

header('Content-type: application/json');
if (isset($_POST['new_id']) && isset($_POST['old_id']) && isset($_COOKIE['token'])) {
    $isValidated = validateToken($_POST['old_id'], $_POST['new_id'], $_COOKIE['token']);
    if ($isValidated) {
        $courseID = $_POST['course_id'];
        $status = array('token' => 'valid', 'delete_status' => 'not_deleted', 'parameters' => 'correct');

        if (deleteCourse($courseID))
            $status['delete_status'] = 'deleted';

        echo json_encode($status);
    } else {
        echo json_encode(array('token' => 'invalid', 'delete_status' => 'not_deleted', 'parameters' => 'correct'));
    }

} else {
    echo json_encode(array('token' => 'invalid', 'delete_status' => 'not_deleted', 'parameters' => 'incorrect'));
}

?>