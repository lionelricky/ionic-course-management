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

    $studentid = $_POST['studentid'];
    $courseid = $_POST["courseid"];

    $sql = "DELETE FROM `enrollment` WHERE `courseid` = $courseid AND `studentid` = $studentid";

    $result = $conn->query($sql) or die($conn->error);

    echo(json_encode("SUCCESS!"));
    
} else if (isset($_POST['studentid'])) {

    $studentid = $_POST['studentid'];
    $courseid = $_POST["courseid"];

    $sql = "INSERT INTO `enrollment`(`courseid`, `studentid`) VALUES ('$courseid','$studentid')";

    $result = $conn->query($sql) or die($conn->error);

    echo(json_encode("SUCCESS!"));
    
} else {
    $sql = "Select s.id, s.firstname, s.lastname, b.courseid, c.name from students s, enrollment b, courses c where b.studentid = s.id and b.courseid = c.id";
$result = $conn->query($sql) or die($conn->error);

$num_rows = mysqli_num_rows($result);

$rowArr = array();

while($row = $result->fetch_assoc()){
	array_push($rowArr, $row);
}

print_r(json_encode($rowArr));
}

?>
