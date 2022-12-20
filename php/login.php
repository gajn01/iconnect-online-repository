<?php
session_start();
include("connection.php"); //Establishing connection with our database


// Define $username and $password
        $username= $_POST['username'];
        $password= $_POST['password'];
// To protect from MySQL injection
        $username = stripslashes($username);
        $password = stripslashes($password);
        $username = mysqli_real_escape_string($db, $username);
        $password = mysqli_real_escape_string($db, $password);
        $password = md5($password);
        
        $sql=("SELECT * FROM tbl_account WHERE username='$username' and password='$password'");
        $result= mysqli_query($db,$sql);
        $form_data = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $form_data['success'] = true;
                $form_data['data'] = array(
                       'id' => $row["id"],
                       'username' => $row['username']
                    );
                echo json_encode($form_data);
            }
        }else {
            $form_data['success'] = false;
            $form_data['error_msg'] = "Invalid Credentials!";
            
            echo json_encode($form_data);

        }
        $db->close();
?>