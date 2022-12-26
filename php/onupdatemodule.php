<?php
include("connection.php"); 

        $module_id=$_POST['module_id'];
        $module_title=$_POST['module_title'];
        $module_description=$_POST['module_description'];
        $grade_level=$_POST['grade_level'];

        $sql=("UPDATE tbl_module SET module_title ='$module_title' , module_description ='$module_description' , grade_level ='$grade_level'    WHERE id='$module_id' ");
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