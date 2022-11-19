<?php

include('./api_admin_class.php');

header('Content-type: application/json');
if (isset($_POST['new_id']) && isset($_POST['old_id']) && isset($_COOKIE['token'])) {
    $isValidated = validateToken($_POST['old_id'], $_POST['new_id'], $_COOKIE['token']);
    if ($isValidated) {
        $courseID = $_POST['course_id'];
        $newCourseName = $_POST['new_course_name'];
        $status = array('token' => 'valid', 'update_status' => 'not_updated', 'parameters' => 'correct');

        if (updateCourse($courseID, $newCourseName))
            $status['update_status'] = 'updated';

        echo json_encode($status);
    } else {
        echo json_encode(array('token' => 'invalid', 'update_status' => 'not_updated', 'parameters' => 'correct'));
    }

} else {
    echo json_encode(array('token' => 'invalid', 'update_status' => 'not_updated', 'parameters' => 'incorrect'));
}

?>