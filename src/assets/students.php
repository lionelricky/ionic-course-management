<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$servername = #####;
$username = #####;
$password = #####;
$dbname = #####;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['delete'])) {
    
    $id = $_POST["id"];

    $sql = "DELETE FROM `students` WHERE `id` = '$id'";

    $result = $conn->query($sql) or die($conn->error);

    echo(json_encode("SUCCESS!"));
    
} else if (isset($_POST['id'])) {

	$id = $_POST['id'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST["lastname"];
    $dateofbirth = $_POST["dateofbirth"];


    $sql = "UPDATE `students` SET `firstname` = '$firstname', `lastname` = '$lastname', `dateofbirth` = '$dateofbirth' WHERE `id` = '$id'";
    
    $result = $conn->query($sql) or die($conn->error);

    echo json_encode("SUCCESS!");
    
} else if (isset($_POST['firstname'])) {

    $firstname = $_POST['firstname'];
    $lastname = $_POST["lastname"];
    $dateofbirth = $_POST["dateofbirth"];

    $sql = "INSERT INTO `students`(`firstname`, `lastname`, `dateofbirth`) VALUES ('$firstname','$lastname','$dateofbirth')";

    $result = $conn->query($sql) or die($conn->error);

    echo(json_encode("SUCCESS!"));
    
} else {
    $sql = "SELECT `id`, `firstname`, `lastname`, `dateofbirth` FROM `students`";
    $result = $conn->query($sql) or die($conn->error);
    
    $num_rows = mysqli_num_rows($result);
    
    $rowArr = array();
    
    while($row = $result->fetch_assoc()){
    	array_push($rowArr, $row);
    }
    
    print_r(json_encode($rowArr));
    
}
?>
