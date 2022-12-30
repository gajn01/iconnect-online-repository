<?php
include("connection.php"); 
    $username=$_POST['username'];
    $old_password=$_POST['old_password'];
    $new_password=$_POST['new_password'];

    $new_password = md5($new_password);
    $old_password = md5($old_password);

    $form_data = array();
    $select_query = ("SELECT * FROM tbl_account WHERE username='$username' AND password='$old_password'");
    $result= mysqli_query($db,$select_query);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $update_query = ("UPDATE tbl_account SET password='$new_password' WHERE username='$username'");
            if (mysqli_query($db, $update_query)) {
                $form_data['success'] = true;
                $form_data['success_msg'] = "Password updated successfully!";
            } else {
                $form_data['success'] = false;
                $form_data['error_msg'] ="Failed to update password!";
            }
        }
    }else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Invalid password!";
    }
    echo json_encode($form_data);
    $db->close();
?>