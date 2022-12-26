<?php
include("connection.php"); 

        $module_id=$_POST['module_id'];
        $module_title=$_POST['module_title'];
        $module_description=$_POST['module_description'];
        $grade_level=$_POST['grade_level'];

        if($_FILES["module_file"]["name"]){
            /* FIles input */
            $targetDir = "../uploads/";
            $fileName = basename($_FILES["module_file"]["name"]);
            $targetFilePath = $_SERVER["DOCUMENT_ROOT"] . $fileName;
            $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);

            $sql_file_upload = "INSERT into tbl_module_file (module_id,file_path) VALUES ('$module_id','$fileName')";
            if (mysqli_query($db, $sql_file_upload)) {
                /*  */
                if(move_uploaded_file($_FILES["module_file"]["tmp_name"], $targetFilePath)){
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

                }else{
                    $form_data['success'] = false;
                    $statusMsg = "Sorry, there was an error uploading your file.";
                }
            }else{
                $form_data['success'] = false;
                $statusMsg = "File upload failed, please try again.";
            }
        }else{
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
    
        }
        $db->close();

?>