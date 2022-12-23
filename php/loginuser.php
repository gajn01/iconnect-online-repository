<?php
session_start();
include("connection.php"); 

        $username=$_POST['username'];
        $password=$_POST['password'];

        $username = stripslashes($username);
        $password = stripslashes($password);
        $username = mysqli_real_escape_string($db, $username);
        $password = mysqli_real_escape_string($db, $password);
        $password = md5($password);
        
        $sql=("SELECT 
        tbl_account_profile.id,
        tbl_account_profile.firstname,
        tbl_account_profile.lastname, 
        tbl_account_profile.gender, 
        tbl_account_profile.age, 
        tbl_account_profile.birthdate, 
        tbl_account_profile.email, 
        tbl_account_profile.mobile_number, 
        tbl_account_profile.rank,
        tbl_account_profile.school_id,
        tbl_account_profile.status, 
        tbl_account.username FROM tbl_account_profile RIGHT JOIN tbl_account ON 
        tbl_account.id = tbl_account_profile.account_id WHERE tbl_account.username = '$username' AND tbl_account.password = '$password'");
        $result= mysqli_query($db,$sql);
        $form_data = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $form_data['success'] = true;
                $form_data['data'] = $row;
                echo json_encode($form_data);
            }
        }else {
            $form_data['success'] = false;
            $form_data['error_msg'] = "Invalid Credentials!";
            echo json_encode($form_data);

        }
        $db->close();
?>