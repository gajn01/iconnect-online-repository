<?php
include("connection.php"); 

        $subject_name=$_POST['subject_name'];
        $subject_description=$_POST['subject_description'];
        $subject_id=$_POST['subject_id'];
        
        $subject_name = stripslashes($subject_name);
        $subject_description = stripslashes($subject_description);
        $subject_name = mysqli_real_escape_string($db, $subject_name);
        $subject_description = mysqli_real_escape_string($db, $subject_description);

        $sql=("UPDATE tbl_subject SET subject_name ='$subject_name' , subject_description='$subject_description' WHERE  id='$subject_id' ");
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