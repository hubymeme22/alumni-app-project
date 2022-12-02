<?php

include ('../global-setup.php');
include ('./api_class.php');

$username = filter_var($_GET['username'], FILTER_SANITIZE_ADD_SLASHES);
$query = $conn->query("SELECT * FROM users WHERE username='$username'");

header("Content-type: application/json");
if ($query->num_rows > 0) {
    echo json_encode(array('existing' => true));
} else {
    echo json_encode(array('existing' => false));
}

?>