<?php
    include("connection.php"); 
    $module_id = $_POST['module_id'];

    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT * FROM tbl_module_file WHERE module_id = '$module_id'");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['data'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
    echo json_encode($form_data);
?>