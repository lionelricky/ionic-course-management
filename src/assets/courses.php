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

    $sql = "DELETE FROM `courses` WHERE `id` = '$id'";

    $result = $conn->query($sql) or die($conn->error);

    echo(json_encode("SUCCESS!"));
    
} else if (isset($_POST['id'])) {

	$id = $_POST['id'];
    $name = $_POST['name'];
    $time = $_POST["time"];
    $length = $_POST["length"];


    $sql = "UPDATE `courses` SET `name` = '$name', `time` = '$time', `length` = '$length' WHERE `id` = '$id'";
    
    $result = $conn->query($sql) or die($conn->error);

    echo json_encode("SUCCESS!");
    
} else if (isset($_POST['name'])) {

    $name = $_POST['name'];
    $time = $_POST["time"];
    $length = $_POST["length"];

    $sql = "INSERT INTO `courses`(`name`, `time`, `length`) VALUES ('$name','$time','$length')";

    $result = $conn->query($sql) or die($conn->error);

    echo(json_encode("SUCCESS!"));
} else {
    $sql = "SELECT `id`, `name`, `time`, `length` FROM `courses`";
    $result = $conn->query($sql) or die($conn->error);
    
    $num_rows = mysqli_num_rows($result);
    
    $rowArr = array();
    
    while($row = $result->fetch_assoc()){
    	array_push($rowArr, $row);
    }

    print_r(json_encode($rowArr));

}
?>
