<?php

include ('./api_admin_class.php');


header('Content-type: application/json');
$course_name = $_POST['course'];

if (addCourse($course_name)) {
    echo json_encode(array('added' => true));
} else {
    http_response_code(403);
    echo json_encode(array('added' => false));
}

?>