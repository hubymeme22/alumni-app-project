<?php

include ('./api_admin_class.php');


$courses = getCourses();
header('Content-type: application/json');
echo json_encode($courses);

?>