<?php

include('./timed_session.php');
include('./allow-cross-origin.php');

header('Content-type: application/json');
if (isset($_POST['new_id']) && isset($_POST['old_id']) && isset($_COOKIE['token'])) {
    $isValidated = validateToken($_POST['old_id'], $_POST['new_id'], $_COOKIE['token']);
    if ($isValidated) {
        $id = $_POST['id'];
        $username = $_POST['username'];
        $facebook = isset($_POST['facebook']) ? $_POST['facebook'] : '#';
        $twitter = isset($_POST['twitter']) ? $_POST['twitter'] : '#';
        $linkedin = isset($_POST['linkedin']) ? $_POST['linkedin'] : '#';
        $github = isset($_POST['github']) ? $_POST['github'] : '#';

        $session_status = updateUserInfo($id, $username, $facebook, $twitter, $linkedin, $github);
        echo json_encode($session_status);
    } else {
        echo json_encode(array('token' => 'invalid', 'update_status' => 'not_updated', 'parameters' => 'correct'));
    }

} else {
    echo json_encode(array('token' => 'invalid', 'update_status' => 'not_updated', 'parameters' => 'incorrect'));
}

?>