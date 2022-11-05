<?php
session_start();

$_SESSION["bullshit_data"] = array();
class Bullshit {
    function pushRandomData($data) {
        // $index = rand();
        // while (array_key_exists($index, $_SESSION['bullshit_data'])) {
        //     $index = rand();
        // }

        // $_SESSION['bullshit_data'][$index] = $data;
        array_push($_SESSION["bullshit_data"], $data);
    }

    function printData() {
        var_dump($_SESSION["bullshit_data"]);
    }
}

$putangina = new Bullshit();

?>