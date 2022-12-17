<?php
session_start();
include("connection.php"); //Establishing connection with our database


// Define $username and $password
        $username=$_POST['username'];
        $password=$_POST['password'];
// To protect from MySQL injection
        $username = stripslashes($username);
        $password = stripslashes($password);
        $username = mysqli_real_escape_string($db, $username);
        $password = mysqli_real_escape_string($db, $password);
        $password = md5($password);
//Check username and password from database
        $sql=("SELECT id FROM tbl_account WHERE username='$username' and password='$password'");
        $result= mysqli_query($db,$sql);
//If username and password exist in our database then create a session.
//Otherwise echo error.
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo json_encode(array('success' => 1));
            }
        }else {
            $error = "Incorrect username or password.";
            echo "<script> alert('Invalid Username or Password!')</script> <meta http-equiv='refresh' content='0;url=cart.php?id=1'>";
        }
        $db->close();

?>