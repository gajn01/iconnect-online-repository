<?php
include("connection.php"); 

    $username=$_POST['username'];

    $sql=("SELECT * FROM tbl_account");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    $form_data = array();
    if($fetch){
        foreach ($fetch as $value) {
            if($value['username'] != $username ){
                $form_data['success'] = true ;
                $form_data['success_msg'] = "Username is okay!" ;
                break;
            }else{
                $form_data['success'] = false ;
                $form_data['error_msg'] = "Username is already taken!" ;
                break;
            }
        }
        echo json_encode($form_data);
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "error list";
    }
  

    function toSignUp(){
        $school_address=$_POST['school_address'];
        
        $school_name = stripslashes($school_name);
        $school_address = stripslashes($school_address);
        $school_name = mysqli_real_escape_string($db, $school_name);
        $school_address = mysqli_real_escape_string($db, $school_address);
        
        $sql=("INSERT INTO tbl_school (school_name,school_address) VALUES ('$school_name','$school_address')");
        $form_data = array();
        if (mysqli_query($db, $sql)) {
            $form_data['success'] = true;
            $form_data['success_msg'] = "New record created successfully";
            echo json_encode($form_data);

		} else {
            $form_data['success'] = false;
            $form_data['error_msg'] = $sql;
        }

        $db->close();
    }

?>