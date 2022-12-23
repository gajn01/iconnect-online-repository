<?php
include("connection.php"); 


    $targetDir = "D:/Work/Freelance/iconnect/uploads/";
    $fileName = basename($_FILES["module_file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);
    $form_data = array();

    $teacher_id = $_POST['teacher_id'];

    /* $sql = "INSERT into tbl_module_file (module_id, file_path) VALUES (1,'$fileName')";
    if (mysqli_query($db, $sql)) {
        if(move_uploaded_file($_FILES["module_file"]["tmp_name"], $targetFilePath)){
            $statusMsg = "The file ".$fileName. " has been uploaded successfully.";
        }else{
                $statusMsg = "Sorry, there was an error uploading your file.";
            }
    }else{
        $statusMsg = "File upload failed, please try again.";
    }

    $form_data['success'] = true;
    $form_data['success_msg'] = $statusMsg; */

    $form_data['success_msg'] = $teacher_id;
    echo json_encode($form_data);

    $db->close();



/*     $school_name=$_POST['school_name'];
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

    $db->close(); */


    
 /*    
    $targetDir = "uploads/";
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);
    
    if(isset($_POST["submit"]) && !empty($_FILES["file"]["name"])){
        // Allow certain file formats
        $allowTypes = array('jpg','png','jpeg','gif','pdf');
        if(in_array($fileType, $allowTypes)){
            // Upload file to server
            if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){
                // Insert image file name into database
                $insert = $db->query("INSERT into images (file_name, uploaded_on) VALUES ('".$fileName."', NOW())");
                if($insert){
                    $statusMsg = "The file ".$fileName. " has been uploaded successfully.";
                }else{
                    $statusMsg = "File upload failed, please try again.";
                } 
            }else{
                $statusMsg = "Sorry, there was an error uploading your file.";
            }
        }else{
            $statusMsg = 'Sorry, only JPG, JPEG, PNG, GIF, & PDF files are allowed to upload.';
        }
    }else{
        $statusMsg = 'Please select a file to upload.';
    }
    
    // Display status message
    echo $statusMsg;
    ?> */

?>