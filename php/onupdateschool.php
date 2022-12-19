<?php
include("connection.php"); 

        $school_name=$_POST['school_name'];
        $school_address=$_POST['school_address'];
        $school_id=$_POST['school_id'];

        
        $school_name = stripslashes($school_name);
        $school_address = stripslashes($school_address);
        $school_name = mysqli_real_escape_string($db, $school_name);
        $school_address = mysqli_real_escape_string($db, $school_address);


       /*  UPDATE MyGuests SET lastname='Doe' WHERE id=2 */

       echo '<script> alert('$school_id') </script>';
        
       /*  school_id
        $sql=("UPDATE tbl_school  (school_name,school_address) VALUES ('$school_name','$school_address')");
        $form_data = array();
        if (mysqli_query($db, $sql)) {
            $form_data['success'] = true;
            $form_data['success_msg'] = "New record created successfully";
            echo json_encode($form_data);

		} else {
            $form_data['success'] = false;
            $form_data['error_msg'] = $sql;
        } */

        $db->close();

?>