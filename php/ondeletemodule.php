<?php
include("connection.php"); 

        $module_id=$_POST['module_id'];
        $sql=("DELETE FROM  tbl_module WHERE id='$module_id' ");
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