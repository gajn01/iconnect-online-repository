<?php
include("connection.php"); 

        $school_name=$_POST['school_name'];
        $school_address=$_POST['school_address'];
        $school_id=$_POST['school_id'];
        
        $school_name = stripslashes($school_name);
        $school_address = stripslashes($school_address);
        $school_name = mysqli_real_escape_string($db, $school_name);
        $school_address = mysqli_real_escape_string($db, $school_address);

        $sql=("UPDATE tbl_school SET school_name ='$school_name' , school_address='$school_address' WHERE  id='$school_id' ");
        $form_data = array();
        if (mysqli_query($db, $sql)) {
            $form_data['success'] = true;
            $form_data['success_msg'] = "Record updated successfully";
            echo json_encode($form_data);

		} else {
            $form_data['success'] = false;
            $form_data['error_msg'] = $sql;
        }

        $db->close();

?>