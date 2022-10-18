<?php

include('api_class.php');

$joblist = getJobListing();

header('Content-Type: application/json');
echo json_encode($joblist);

?>