<?php

include('./timed_session.php');

header('Content-type: application/json');
if (isset($_POST['new_id']) && isset($_POST['old_id']) && isset($_COOKIE['token'])) {
    $isValidated = validateToken($_POST['old_id'], $_POST['new_id'], $_COOKIE['token']);
    if ($isValidated) {
        $session_status = updateToken($_POST['old_id'], $_POST['new_id'], $_COOKIE['token']);
        $session_status['parameters'] = 'correct';
        echo json_encode($session_status);
    } else {
        echo json_encode(array('token' => 'invalid', 'update_status' => 'not_updated', 'parameters' => 'correct'));
    }

} else {
    echo json_encode(array('token' => 'invalid', 'update_status' => 'not_updated', 'parameters' => 'incorrect'));
}

?>