<?php

include('./api_admin_class.php');

header('Content-type: application/json');
if (isset($_POST['new_id']) && isset($_POST['old_id']) && isset($_COOKIE['token'])) {
    $isValidated = validateToken($_POST['old_id'], $_POST['new_id'], $_COOKIE['token']);
    if ($isValidated) {
        $alumID = $_POST['id'];
        $sex = $_POST['sex'];
        $batch = $_POST['batch'];
        $course = $_POST['course'];
        $email = $_POST['email'];
        $employment = $_POST['employment'];

        $status = array('token' => 'valid', 'update_status' => 'not_updated', 'parameters' => 'correct');

        if (updateAlumInfo($alumID, $sex, $batch, $course, $email, $employment))
            $status['update_status'] = 'updated';

        echo json_encode($status);
    } else {
        echo json_encode(array('token' => 'invalid', 'update_status' => 'not_updated', 'parameters' => 'correct'));
    }

} else {
    echo json_encode(array('token' => 'invalid', 'update_status' => 'not_updated', 'parameters' => 'incorrect'));
}

?>