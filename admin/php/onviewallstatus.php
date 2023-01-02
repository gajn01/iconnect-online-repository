<?php
    include("connection.php"); 

    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT COUNT(id) AS counter FROM `tbl_account_profile` WHERE status = 0");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['pending'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }


    $sql=("SELECT COUNT(id) AS counter FROM `tbl_account_profile`  WHERE status = 1");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['active'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }




    echo json_encode($form_data);
?>