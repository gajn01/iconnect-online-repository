<?php
include("connection.php"); 

        $request_id=$_POST['request_id'];
        $status=$_POST['status'];

        $sql=("UPDATE tbl_account_profile SET status ='$status'  WHERE id='$request_id' ");
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