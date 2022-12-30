<?php
include("connection.php"); 

        $school_id=$_POST['school_id'];
        $sql=("DELETE FROM  tbl_school WHERE id='$school_id' ");
        $form_data = array();
        if (mysqli_query($db, $sql)) {
            $form_data['success'] = true;
            $form_data['success_msg'] = "Record deleted successfully";
            echo json_encode($form_data);

		} else {
            $form_data['success'] = false;
            $form_data['error_msg'] = $sql;
        }

        $db->close();

?>